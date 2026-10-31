import { useState } from "react";
import { Megaphone, UserCheck } from "lucide-react";
import EmployeeActivitySection from "../../component/employeeAndCustomer/Employeetracking.jsx";
import CustomerEngagementSection from "../../component/employeeAndCustomer/CustomerEngagment.jsx";
import "./HomeScan.css";
import "./HomeTeam.css";

/* Staff activity and customer engagement: the two existing sections, one at a time */
export default function HomeTeam() {
  const [tab, setTab] = useState("staff");
  return (
    <section className='slw-legacy slw-team' id='staff'>
      <div className='slw-team__head'>
        <span className='slw-eyebrow slw-team__eyebrow'>Staff &amp; customers</span>
        <h2 className='slw-h2 slw-team__title'>Know who did what. Talk to every customer.</h2>
        <div className='slw-team__tabs' role='tablist'>
          <button
            type='button'
            role='tab'
            aria-selected={tab === "staff"}
            className={tab === "staff" ? "is-on" : ""}
            onClick={() => setTab("staff")}
          >
            <UserCheck size={17} /> Staff activity
          </button>
          <button
            type='button'
            role='tab'
            aria-selected={tab === "customers"}
            className={tab === "customers" ? "is-on" : ""}
            onClick={() => setTab("customers")}
          >
            <Megaphone size={17} /> Customer engagement
          </button>
        </div>
      </div>
      <div className='slw-team__body' key={tab}>
        {tab === "staff" ? <EmployeeActivitySection /> : <CustomerEngagementSection />}
      </div>
    </section>
  );
}
