export const services = [
  {
    slug: 'ai-visibility', name: 'AI Visibility',
    lead: 'When someone asks ChatGPT to recommend a clinic near them, does yours come up?',
    description: 'Help AI assistants find clear, accurate information about your clinic and the treatments you offer.',
    paragraphs: [
      'People ask ChatGPT, Claude, Gemini and Perplexity for recommendations every day. A mention at just the right moment can introduce your practice to someone who is already looking for care. By July 2025, more than 700 million people were using ChatGPT each week. That’s quite an audience.',
      'Try it yourself. Ask ChatGPT, “Which clinic in my area would you recommend for a dental cleaning?” Give it your town and read the answer. Does it mention your practice? What does it say about the clinics it recommends?',
      'If your name doesn’t come up, take a breath. Imagine another six months of local patients asking that question. Who are they hearing about? We look at what assistants can find about your clinic, check it against the care you actually offer and update the pages and listings where the picture is incomplete. Then we repeat the questions and track what changes.'
    ],
    source: ['OpenAI research on ChatGPT usage', 'https://cdn.openai.com/pdf/a253471f-8260-40c6-a2cc-aa93fe9f142e/economic-research-chatgpt-usage-paper.pdf'],
    cta: 'Discuss my clinic’s AI visibility'
  },
  {
    slug: 'cro-updates', name: 'CRO Updates',
    lead: 'Plenty of visitors and clicks, but fewer appointment requests than you expected?',
    description: 'Find out where patients leave your booking journey and improve the buttons, forms and copy they encounter.',
    paragraphs: [
      'Do visitors click “Book an appointment” and leave before they finish the form? Or are you still wondering how many people click that button in the first place?',
      'That’s where conversion rate optimisation (CRO) comes in. We set up measurement for the steps that matter, from the first click to a completed enquiry. If people can’t spot the booking button on a phone, we change its position, contrast and wording. If they leave halfway through the form, we look at what you’re asking them to do.',
      'Sometimes the button is easy to find and the patient still hesitates. We work on the words around it, too. Can someone tell how you can help with their particular concern and what will happen once they get in touch?'
    ], cta: 'Review my booking journey'
  },
  {
    slug: 'copywriting-that-sells', name: 'Copywriting That Sells',
    lead: 'Patients read your articles. What makes them want to get in touch?',
    description: 'Turn useful clinic articles into conversations with patients who are considering their next step.',
    paragraphs: [
      'You put time into publishing blog posts. People read them, get to the end and leave without booking an appointment or asking a question. What did they need to hear before they felt ready to contact you?',
      'We write those articles for you. We start with a question your patients actually ask, explain the answer in everyday language and give the reader a natural way to carry on the conversation with your team.',
      'And that hardworking marketer on your team? She might finally get to lunch on time.'
    ], cta: 'Talk about my clinic’s copy'
  },
  {
    slug: 'unique-website-design', name: 'Unique Website Design',
    lead: 'If you covered up the logo, could a patient tell your website from the clinic down the road?',
    description: 'A custom website that shows patients what makes your practice distinctive and makes it easy to book.',
    paragraphs: [
      'Does your website look almost exactly like the other clinics in your area? Does the design feel like it belongs in 2010? You might deliver excellent care and still feel that the first thing patients see online barely does it justice.',
      '“We’re the best.” “We offer the highest quality.” “We really care about our patients.” I can almost hear you saying it. Guess what the clinic around the corner is saying? Exactly.',
      'Good design gives patients something they can see for themselves. We build around your people, your practice and the way you explain care. From the first screen to the booking button, the site should feel like a visit to your clinic.'
    ], cta: 'Discuss my website design'
  }
]
export const servicePath = item => '/en/services/' + item.slug
