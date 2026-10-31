import { useState } from "react";
import { BookOpen, Clock, Download, FileText, Play, Plus } from "lucide-react";
import { faqs, manual, resources, wa } from "../hospitalityConfig";
import "./HospitalityResources.css";

const TYPES = {
  Guide: { icon: BookOpen, label: "Getting started" },
  Video: { icon: Play, label: "Video tutorials" },
  Install: { icon: Download, label: "Installation" },
  Docs: { icon: FileText, label: "Documentation" },
};

function ResourceCard({ r, index }) {
  const T = TYPES[r.type] || TYPES.Guide;
  const Icon = r.video ? Play : r.file ? (r.page ? BookOpen : Download) : T.icon;

  let href;
  let props = { target: "_blank", rel: "noopener noreferrer" };
  let action;
  if (r.file && !r.page) {
    href = r.file;
    props = { download: r.fileName || true };
    action = "Download PDF";
  } else if (r.file) {
    href = `${r.file}#page=${r.page}`;
    action = "Open in the manual";
  } else if (r.video || r.href) {
    href = r.video || r.href;
    action = r.video ? "Watch on YouTube" : "Open";
  } else {
    href = wa(`Hi StoreLense, please send me the "${r.title}" ${r.type === "Video" ? "video" : "guide"}.`);
    action = "Ask on WhatsApp";
  }

  return (
    <a
      className={`slh-res__card slh-res__card--${r.type.toLowerCase()} ${r.featured ? "is-featured" : ""}`}
      href={href}
      {...props}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className='slh-res__cover'>
        {r.cover && <img className='slh-res__coverImg' src={r.cover} alt='' loading='lazy' />}
        <span className='slh-res__coverIc'>
          <Icon size={r.featured ? 30 : 22} />
        </span>
        <span className='slh-res__type'>{T.label}</span>
        <span className={`slh-res__action ${action === "Ask on WhatsApp" ? "is-ask" : ""}`}>{action}</span>
      </div>
      <div className='slh-res__body'>
        <b>{r.title}</b>
        <span>{r.text}</span>
        {r.meta && (
          <small>
            {r.file ? <FileText size={13} /> : <Clock size={13} />} {r.meta}
          </small>
        )}
      </div>
    </a>
  );
}

/* 12. Resources & tutorials: visual library, plus FAQs */
export default function HospitalityResources() {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(0);
  const shown = filter === "All" ? resources : resources.filter((r) => r.type === filter);

  return (
    <section className='slh-res' id='slh-resources'>
      <div className='slh-wrap'>
        <div className='slh-res__head'>
          <div>
            <span className='slh-eyebrow'>Resources & tutorials</span>
            <h2 className='slh-h2'>Learn it in an afternoon.</h2>
            <a className='slh-btn slh-btn--blue slh-res__manual' href={manual.file} download={manual.fileName}>
              <Download size={18} /> Download the training manual
              <small>
                PDF · {manual.pages} pages · {manual.size}
              </small>
            </a>
          </div>
          <div className='slh-res__filters'>
            {["All", ...Object.keys(TYPES)].map((f) => (
              <button key={f} type='button' className={filter === f ? "is-on" : ""} onClick={() => setFilter(f)}>
                {f === "All" ? "All" : TYPES[f].label}
              </button>
            ))}
          </div>
        </div>

        <div className='slh-res__grid' key={filter}>
          {shown.map((r, i) => (
            <ResourceCard key={r.title} r={r} index={i} />
          ))}
        </div>

        <div className='slh-res__faq' id='slh-faq'>
          <div className='slh-res__faqHead'>
            <h3>Frequently asked questions</h3>
            <p>Can't find your answer? Our team replies the same day.</p>
            <a href='#slh-contact'>Ask a question &rarr;</a>
          </div>
          <div className='slh-res__faqList'>
            {faqs.map((f, i) => (
              <div key={f.q} className={`slh-res__q ${open === i ? "is-open" : ""}`}>
                <button type='button' onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q}
                  <span>
                    <Plus size={18} />
                  </span>
                </button>
                <div className='slh-res__a'>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
