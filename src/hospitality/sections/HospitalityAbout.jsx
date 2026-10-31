import useInView from "../useInView";
import "./HospitalityAbout.css";

const PROBLEMS = [
  {
    n: "01",
    pain: "Orders written on paper go missing between the table and the kitchen.",
    fix: "Waiters send orders from their phones. The kitchen sees them at once and prints a ticket for each station.",
  },
  {
    n: "02",
    pain: "Stock disappears and nobody can say where it went.",
    fix: "Every move from storage to kitchen or bar is recorded, and low stock is flagged before you run out.",
  },
  {
    n: "03",
    pain: "The network drops in the middle of a busy night.",
    fix: "Sales and orders are saved on the device and sent in order when the connection comes back. Nothing is charged twice.",
  },
  {
    n: "04",
    pain: "You only learn how the month went when the accountant tells you.",
    fix: "Revenue, cost of sales, profit, expenses and VAT are worked out as you sell.",
  },
];

/* 2. About: editorial storytelling layout */
export default function HospitalityAbout() {
  const [ref, inView] = useInView();

  return (
    <section className='slh-about' id='slh-about'>
      <div className={`slh-wrap slh-about__grid slh-reveal ${inView ? "is-in" : ""}`} ref={ref}>
        <header className='slh-about__head'>
          <span className='slh-eyebrow'>About StoreLense Hospitality</span>
          <h2 className='slh-about__title'>
            A venue is five businesses
            <em> under one roof.</em>
          </h2>
        </header>

        <div className='slh-about__story'>
          <p className='slh-about__drop'>
            A kitchen, a bar, a store room, a cash desk and a dining room, each with its own paper, its own people and
            its own version of the truth. StoreLense Hospitality brings them onto one shared system, built by the team
            behind StoreLense for retail and shaped for how Nigerian venues actually work.
          </p>
          <p>
            The till, the waiters' phones and the kitchen screen all see the same menu, the same tables and the same
            stock, in real time. Payment fits how your guests pay: cash, transfer, POS terminals and card.
          </p>
          <blockquote className='slh-about__quote'>
            <span aria-hidden='true'>&ldquo;</span>
            Spend the night with your guests, not chasing paper.
          </blockquote>
        </div>

        <ol className='slh-about__list'>
          {PROBLEMS.map((p) => (
            <li key={p.n} className='slh-about__item'>
              <span className='slh-about__num'>{p.n}</span>
              <div>
                <p className='slh-about__pain'>{p.pain}</p>
                <p className='slh-about__fix'>{p.fix}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className='slh-about__facts'>
          <div>
            <b>4</b>
            <span>business types: restaurant, cafe, bar, hotel</span>
          </div>
          <div>
            <b>3</b>
            <span>apps on one menu: POS, waiter, kitchen</span>
          </div>
          <div>
            <b>1</b>
            <span>team on the ground to set you up</span>
          </div>
        </div>
      </div>
    </section>
  );
}
