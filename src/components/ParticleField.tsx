import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 180
const CONNECTION_DISTANCE = 2.2
const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE
const FIELD_SIZE = 12

function createParticleData() {
  const positions: number[][] = []
  const velocities: number[][] = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions.push([
      (Math.random() - 0.5) * FIELD_SIZE,
      (Math.random() - 0.5) * FIELD_SIZE,
      (Math.random() - 0.5) * FIELD_SIZE * 0.5,
    ])
    velocities.push([
      (Math.random() - 0.5) * 0.008,
      (Math.random() - 0.5) * 0.008,
      (Math.random() - 0.5) * 0.004,
    ])
  }
  return { positions, velocities }
}

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particlesRef = useRef<ReturnType<typeof createParticleData> | null>(null)

  useEffect(() => {
    particlesRef.current = createParticleData()
  }, [])

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const maxLines = PARTICLE_COUNT * 6
    const posArray = new Float32Array(maxLines * 6)
    const colorArray = new Float32Array(maxLines * 6)
    geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
    geo.setDrawRange(0, 0)
    return geo
  }, [])

  useEffect(() => {
    return () => {
      lineGeometry.dispose()
    }
  }, [lineGeometry])
  useFrame((state) => {
    const particles = particlesRef.current
    if (!meshRef.current || !linesRef.current || !particles) return
    const time = state.clock.elapsedTime

    // Update particle positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const pos = particles.positions[i]
      const vel = particles.velocities[i]

      pos[0] += vel[0]
      pos[1] += vel[1]
      pos[2] += vel[2]

      // Wrap around boundaries
      for (let d = 0; d < 3; d++) {
        const limit = d === 2 ? FIELD_SIZE * 0.25 : FIELD_SIZE * 0.5
        if (pos[d] > limit) pos[d] = -limit
        if (pos[d] < -limit) pos[d] = limit
      }

      const scale = 0.03 + Math.sin(time * 0.5 + i) * 0.01
      dummy.position.set(pos[0], pos[1], pos[2])
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true

    // Update connection lines
    const posAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute
    const colAttr = lineGeometry.getAttribute('color') as THREE.BufferAttribute
    let lineIndex = 0
    const maxLines = PARTICLE_COUNT * 6

    for (let i = 0; i < PARTICLE_COUNT && lineIndex < maxLines; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIndex < maxLines; j++) {
        const dx = particles.positions[i][0] - particles.positions[j][0]
        const dy = particles.positions[i][1] - particles.positions[j][1]
        const dz = particles.positions[i][2] - particles.positions[j][2]
        const distSq = dx * dx + dy * dy + dz * dz

        if (distSq < CONNECTION_DISTANCE_SQ) {
          const dist = Math.sqrt(distSq)
          const alpha = 1 - dist / CONNECTION_DISTANCE
          const idx = lineIndex * 6

          posAttr.array[idx] = particles.positions[i][0]
          posAttr.array[idx + 1] = particles.positions[i][1]
          posAttr.array[idx + 2] = particles.positions[i][2]
          posAttr.array[idx + 3] = particles.positions[j][0]
          posAttr.array[idx + 4] = particles.positions[j][1]
          posAttr.array[idx + 5] = particles.positions[j][2]

          // Burnt orange color with alpha
          const r = 0.75 * alpha
          const g = 0.34 * alpha
          const b = 0.0 * alpha
          colAttr.array[idx] = r
          colAttr.array[idx + 1] = g
          colAttr.array[idx + 2] = b
          colAttr.array[idx + 3] = r
          colAttr.array[idx + 4] = g
          colAttr.array[idx + 5] = b

          lineIndex++
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIndex * 2)
    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#BF5700" transparent opacity={0.8} />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.4} />
      </lineSegments>
    </>
  )
}

export default function ParticleField() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  )
}
