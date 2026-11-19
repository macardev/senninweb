// A two-ink coastal print. The beam and water move independently of the lettering.
export default function CoastPrint() {
  return <svg aria-hidden="true" viewBox="0 0 800 300" className="coast-print" fill="none">
    <path className="coast-beam" d="M228 113L756 37 756 112Z" fill="currentColor" opacity=".22"/>
    <g stroke="currentColor" strokeLinejoin="round" strokeWidth="3">
      <path d="M0 237l75-24 71 5 48-23 46 3 53 29 68 8 65 27H0Z" fill="currentColor"/>
      <path d="M198 199l9-74h21l9 76zM202 124h31v-7h-31zM207 115v-13h21v13M202 101l16-12 16 12z"/>
      <path d="M207 148l20-9m-21 25 24-11m-26 29 27-12"/>
    </g>
    <g className="coast-water" stroke="currentColor" strokeWidth="1.4">
      {Array.from({length:13}, (_, i) => <path key={i} d={`M-30 ${233+i*5} Q 100 ${223+i*5} 215 ${239+i*5} T 468 ${241+i*4} T 825 ${232+i*5}`}/>)}
    </g></svg>
}
