const linkedin = 'https://www.linkedin.com/in/çağatay-samet-macar-5bb930411/'
export default function LinkedinProfile() {
  return <a className="studio-profile" href={linkedin} aria-label="Çağatay Samet Macar on LinkedIn">
    <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM8 18.75H5V9h3zm-1.5-11A1.75 1.75 0 1 1 6.5 4.25a1.75 1.75 0 0 1 0 3.5ZM19 18.75h-3v-5.1c0-1.2-.44-2-1.55-2-1.21 0-1.65.84-1.65 2v5.1h-3V9h2.88v1.3c.5-.84 1.38-1.57 2.95-1.57 2.2 0 3.37 1.4 3.37 4.2z"/></svg>
    LinkedIn <span aria-hidden="true">↗</span></a>
}
