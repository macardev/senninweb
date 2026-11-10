from pathlib import Path
import sys
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.enums import TA_LEFT
import pypdfium2 as pdfium
from pypdf import PdfReader

OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[2] / 'public' / 'rehber'
OUT.mkdir(parents=True, exist_ok=True)
pdf = OUT / 'patient-enquiry-playbook.pdf'
c = canvas.Canvas(str(pdf), pagesize=(595,842))
c.setTitle('The Patient Enquiry Playbook - SenninWeb')
c.setAuthor('SenninWeb')
style = ParagraphStyle('body',fontName='Helvetica',fontSize=12,leading=19,textColor=HexColor('#333333'))
pages = [
('The Patient Enquiry Playbook', 'A practical website and search guide for private clinics in Ireland', [
('Start with a clearer path', 'Patients need to understand your care, trust your team and know what to do next. This guide helps you review that path, from a treatment search to an enquiry.'),
('What you will work on', 'Choose a treatment and audience. Improve one treatment page. Make contact easier. Measure useful enquiries. Use a focused 30-day action plan.'),
('Who this is for', 'Owners and managers of dental, aesthetic, hair restoration and private practices. Use the examples as planning prompts and adapt them to your services and resources.'),
('A useful starting point', 'Open your website on a phone. Can a new visitor identify the treatment, the clinician and the next step without guessing? Write down the first obstacle you notice.')]),
('01 / Choose a focused starting point', 'One treatment. One audience. One useful next step.', [
('Name the treatment', 'Start with a service you can explain clearly and have capacity to deliver. Avoid making your first project a rewrite of every page. Record the treatment, responsible clinician and desired enquiry type.'),
('Describe the patient question', 'List the questions your reception team hears before a consultation: suitability, appointment process, location, likely visits and how pricing is explained. Use these questions to plan the page.'),
('Choose a market deliberately', 'For an international audience, consider language, travel, follow-up arrangements and whether the clinic can support the full patient journey. Do not target a country simply because search volume looks attractive.'),
('Worksheet', 'Our first treatment: __________<br/>Our intended audience: __________<br/>Their main unanswered question: __________<br/>The next step we want them to take: __________')]),
('02 / Build a page patients can use', 'Make the offer, evidence and next step easy to find.', [
('Lead with the patient need', 'Write a heading that explains what the page helps the visitor understand. Add a short introduction describing the service, location and consultation process. Avoid guaranteed outcomes or unsupported superlatives.'),
('Show real evidence', 'Use accurate clinician biographies, actual clinic photographs and clear explanations of your process. Only publish credentials, testimonials and outcome examples that you can substantiate and have permission to use.'),
('Answer before asking', 'Explain what happens at the first appointment, how suitability is assessed, what information is available about fees and how follow-up works. Have the clinical team review treatment information.'),
('Make contact predictable', 'Use a specific button such as Request a consultation. Explain what happens after the enquiry and give a realistic response window your team can meet. Test the whole journey on a phone.')]),
('03 / Help the right people find you', 'Match each page to a real question and a real service.', [
('Organise by treatment', 'Give important services their own useful pages, with descriptive titles and clear internal links. Use the words patients use, while keeping clinical descriptions accurate. Avoid near-identical pages created only to repeat town names.'),
('Keep local details consistent', 'Check your clinic name, location, contact details and opening hours wherever you publish them. Make directions and accessibility information easy to locate. Link relevant service pages from your main navigation.'),
('Plan international pages carefully', 'Publish translations that your team can maintain and review. Explain practical travel and follow-up arrangements where relevant. Ask your developer to check language URLs, canonical tags and hreflang when multiple versions exist.'),
('Check the basics', 'Confirm that key pages load, work on mobile and can be discovered by search engines. Review search impressions and clicks over time. Search visibility is an input to the enquiry journey, not a promise of appointments.')]),
('04 / Turn interest into a conversation', 'Reduce uncertainty at the moment someone contacts you.', [
('Ask only what you need', 'Start with the minimum information your team needs to route an enquiry. Explain why any required field is needed. Avoid requesting sensitive clinical details in a general marketing form or initial messaging exchange.'),
('Give a helpful first reply', 'Example: Thank you for contacting our clinic. Which service would you like to discuss? Our team can explain the consultation process and help you arrange the next step. Adapt the reply to your staffing and services.'),
('Track the journey', 'Record aggregate counts for visits, enquiries, suitable enquiries and booked consultations. Decide what suitable means before reporting. Keep sensitive patient information out of marketing analytics.'),
('Find the actual bottleneck', 'Few visits may call for better visibility. Visits without enquiries may point to unclear information or a difficult contact flow. Enquiries without consultations may point to response time, fit or appointment availability. Investigate before changing everything.')]),
('05 / Your 30-day action plan', 'A small, measurable improvement each week.', [
('Week 1 / Review', 'Choose one treatment page. Record your baseline enquiries and the current contact journey. Ask reception for the three most common unanswered questions. Identify the owner of each improvement.'),
('Week 2 / Clarify', 'Rewrite the introduction and next-step button. Add missing practical information and verified clinician details. Review treatment copy with the clinical team.'),
('Week 3 / Test', 'Test the page and contact flow on mobile. Check links, confirmations and team routing. Review language and search settings with your developer. Fix the most consequential obstacles first.'),
('Week 4 / Learn', 'Compare enquiries and their suitability with your baseline. Small samples can mislead, so use patient questions and team feedback alongside the numbers. Choose the next improvement based on what you learned.'),
('Want a review of your own clinic website?', 'Send SenninWeb your website, clinic type and target market on WhatsApp. Ask for a free website and search review to identify the next practical steps. Do not include patient details.')])]
for index,(title,subtitle,sections) in enumerate(pages):
    c.setFillColor(HexColor('#f5f1e8'));c.rect(0,0,595,842,fill=1,stroke=0)
    c.setFillColor(HexColor('#D97706'));c.rect(0,802,595,40,fill=1,stroke=0)
    c.setFillColor(HexColor('#111111'));c.setFont('Helvetica-Bold',11);c.drawString(44,817,'SENNINWEB / FREE CLINIC GUIDE')
    y=766
    p=Paragraph(title,ParagraphStyle('title',fontName='Helvetica-Bold',fontSize=30,leading=34,textColor=HexColor('#111111')))
    _,h=p.wrap(507,200);p.drawOn(c,44,y-h);y-=h+16
    p=Paragraph(subtitle,style);_,h=p.wrap(507,100);p.drawOn(c,44,y-h);y-=h+27
    for heading,body in sections:
        p=Paragraph(heading,ParagraphStyle('heading',parent=style,fontName='Helvetica-Bold',fontSize=14,leading=18));_,h=p.wrap(507,100);p.drawOn(c,44,y-h);y-=h+7
        p=Paragraph(body,style);_,h=p.wrap(507,400);p.drawOn(c,44,y-h);y-=h+20
    if index==5:
        c.setFillColor(HexColor('#D97706'));c.rect(44,y-22,250,30,fill=1,stroke=0)
        c.setFillColor(HexColor('#111111'));c.setFont('Helvetica-Bold',11);c.drawString(54,y-11,'Request my free review on WhatsApp')
        c.linkURL('https://wa.me/905314051584?text=Hello%2C%20I%20read%20your%20Patient%20Enquiry%20Playbook%20and%20would%20like%20a%20free%20clinic%20website%20review.',(44,y-22,294,y+8),relative=0)
        y-=30
    assert y>65,(index,y)
    c.setFillColor(HexColor('#555555'));c.setFont('Helvetica',9);c.drawString(44,38,'senninweb.com/en | Planning guidance; no outcome guarantees.');c.drawRightString(551,38,f'{index+1} / {len(pages)}')
    c.showPage()
c.save()
assert len(PdfReader(str(pdf)).pages)==6
doc=pdfium.PdfDocument(str(pdf))
if len(sys.argv) > 2:
    review = Path(sys.argv[2])
    review.mkdir(parents=True, exist_ok=True)
    for i,page in enumerate(doc): page.render(scale=1).to_pil().save(review / f'guide-review-{i+1}.png')
print(pdf)
