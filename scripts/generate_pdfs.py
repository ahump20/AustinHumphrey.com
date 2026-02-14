#!/usr/bin/env python3
"""Generate Premium and ATS-friendly resume PDFs from exported JSON data."""

import json
import os
import sys

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.lib.colors import HexColor
    from reportlab.platypus import (
        SimpleDocTemplate,
        Paragraph,
        Spacer,
        HRFlowable,
    )
except ImportError:
    print(
        "Error: reportlab is not installed.\n"
        "Install it with:  pip install reportlab\n"
        "Then re-run this script."
    )
    sys.exit(1)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(SCRIPT_DIR, "resume_export.json")
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "..", "public", "assets")

PREMIUM_FILENAME = "Austin_Humphrey_Resume.pdf"
ATS_FILENAME = "Austin_Humphrey_Resume_ATS.pdf"


def load_resume_data() -> dict:
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


# ---------------------------------------------------------------------------
# Premium (styled) resume
# ---------------------------------------------------------------------------

def build_premium_pdf(data: dict, output_path: str) -> None:
    brand_colors = data.get("brand", {}).get("colors", {})
    accent = HexColor(brand_colors.get("burntOrange", "#BF5700"))
    dark = HexColor(brand_colors.get("charcoal", "#1A1A1A"))

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        topMargin=0.5 * inch,
        bottomMargin=0.5 * inch,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
    )

    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        "Name",
        parent=styles["Title"],
        fontSize=22,
        leading=26,
        textColor=dark,
        spaceAfter=2,
    )
    tagline_style = ParagraphStyle(
        "Tagline",
        parent=styles["Normal"],
        fontSize=11,
        leading=14,
        textColor=accent,
        spaceAfter=4,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontSize=13,
        leading=16,
        textColor=accent,
        spaceBefore=10,
        spaceAfter=4,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontSize=10,
        leading=13,
        textColor=dark,
    )
    bullet_style = ParagraphStyle(
        "Bullet",
        parent=body_style,
        leftIndent=18,
        bulletIndent=6,
        spaceAfter=2,
    )
    contact_style = ParagraphStyle(
        "Contact",
        parent=styles["Normal"],
        fontSize=9,
        leading=12,
        textColor=dark,
    )

    story: list = []

    # Header
    story.append(Paragraph(data["name"], name_style))
    story.append(Paragraph(data.get("tagline", ""), tagline_style))

    contact = data.get("contact", {})
    contact_parts = [
        contact.get("location", ""),
        contact.get("phone", ""),
        " | ".join(contact.get("emails", [])),
        contact.get("linkedin", ""),
        " | ".join(contact.get("websites", [])),
    ]
    story.append(Paragraph("  •  ".join(p for p in contact_parts if p), contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=accent))

    # Summary
    story.append(Paragraph("Summary", section_style))
    story.append(Paragraph(data.get("summary", ""), body_style))

    # Experience
    story.append(Paragraph("Experience", section_style))
    for exp in data.get("experience", []):
        title_line = f"<b>{exp['title']}</b> — {exp['company']}  ({exp['dates']})"
        story.append(Paragraph(title_line, body_style))
        story.append(Paragraph(f"<i>{exp.get('location', '')}</i>", body_style))
        for bullet in exp.get("bullets", []):
            story.append(Paragraph(f"• {bullet}", bullet_style))
        story.append(Spacer(1, 4))

    # Education
    story.append(Paragraph("Education", section_style))
    for edu in data.get("education", []):
        line = f"<b>{edu['institution']}</b> — {edu['degree']}"
        if edu.get("details"):
            line += f"  ({edu['details']})"
        story.append(Paragraph(line, body_style))

    # Skills
    story.append(Paragraph("Skills", section_style))
    for skill in data.get("skills", []):
        story.append(Paragraph(f"• {skill}", bullet_style))

    # Honors & Leadership
    if data.get("honorsAndLeadership"):
        story.append(Paragraph("Honors & Leadership", section_style))
        for item in data["honorsAndLeadership"]:
            story.append(Paragraph(f"• {item}", bullet_style))

    doc.build(story)
    print(f"Premium PDF written to {output_path}")


# ---------------------------------------------------------------------------
# ATS-friendly (plain) resume
# ---------------------------------------------------------------------------

def build_ats_pdf(data: dict, output_path: str) -> None:
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        topMargin=0.5 * inch,
        bottomMargin=0.5 * inch,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
    )

    styles = getSampleStyleSheet()

    name_style = ParagraphStyle(
        "ATSName",
        parent=styles["Title"],
        fontSize=16,
        leading=20,
        spaceAfter=2,
    )
    section_style = ParagraphStyle(
        "ATSSection",
        parent=styles["Heading2"],
        fontSize=12,
        leading=15,
        spaceBefore=10,
        spaceAfter=4,
    )
    body_style = ParagraphStyle(
        "ATSBody",
        parent=styles["Normal"],
        fontSize=10,
        leading=13,
    )
    bullet_style = ParagraphStyle(
        "ATSBullet",
        parent=body_style,
        leftIndent=18,
        bulletIndent=6,
        spaceAfter=2,
    )

    story: list = []

    story.append(Paragraph(data["name"], name_style))

    contact = data.get("contact", {})
    contact_parts = [
        contact.get("location", ""),
        contact.get("phone", ""),
        " | ".join(contact.get("emails", [])),
        contact.get("linkedin", ""),
        " | ".join(contact.get("websites", [])),
    ]
    story.append(Paragraph("  |  ".join(p for p in contact_parts if p), body_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("SUMMARY", section_style))
    story.append(Paragraph(data.get("summary", ""), body_style))

    story.append(Paragraph("EXPERIENCE", section_style))
    for exp in data.get("experience", []):
        story.append(Paragraph(
            f"{exp['title']} - {exp['company']}, {exp.get('location', '')} ({exp['dates']})",
            body_style,
        ))
        for bullet in exp.get("bullets", []):
            story.append(Paragraph(f"- {bullet}", bullet_style))
        story.append(Spacer(1, 4))

    story.append(Paragraph("EDUCATION", section_style))
    for edu in data.get("education", []):
        line = f"{edu['institution']} - {edu['degree']}"
        if edu.get("details"):
            line += f" ({edu['details']})"
        story.append(Paragraph(line, body_style))

    story.append(Paragraph("SKILLS", section_style))
    for skill in data.get("skills", []):
        story.append(Paragraph(f"- {skill}", bullet_style))

    if data.get("honorsAndLeadership"):
        story.append(Paragraph("HONORS & LEADERSHIP", section_style))
        for item in data["honorsAndLeadership"]:
            story.append(Paragraph(f"- {item}", bullet_style))

    doc.build(story)
    print(f"ATS PDF written to {output_path}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    if not os.path.isfile(JSON_PATH):
        print(
            f"Error: Resume JSON not found at:\n  {JSON_PATH}\n\n"
            "Run the export script first:\n"
            "  npx tsx scripts/export_resume.ts"
        )
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    resume_data = load_resume_data()

    build_premium_pdf(resume_data, os.path.join(OUTPUT_DIR, PREMIUM_FILENAME))
    build_ats_pdf(resume_data, os.path.join(OUTPUT_DIR, ATS_FILENAME))
