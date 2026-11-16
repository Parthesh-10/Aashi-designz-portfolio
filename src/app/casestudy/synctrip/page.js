import Link from 'next/link';

export default function SyncTrip() {
  return (
    <>
      <div className="mainContainer container">
  <div className="synctripImg">
    <img src="/img/casestudy/synctrip.png" alt="synctrip" />
  </div>
  <div className="syncTripDesc">
    <div>
      <h1>Synctrip</h1>

      <h3>
        A travel platform designed to help solo and group travelers effortlessly
        plan, organise and stay in sync throughout their journey.
      </h3>

      <ul>
        <li>
          <p>
            <strong>Project Type:</strong> End-to-end product design + branding
          </p>
        </li>
        <li>
          <p>
            <strong>Role:</strong>Sole UX/UI designer + brand identity designer
            (with guidance through critique sessions)
          </p>
        </li>
        <li>
          <p><strong>Industry:</strong>Travel, Lifestyle, Digital Experience</p>
        </li>
        <li>
          <p><strong>Tools:</strong>Figma, FigJam, Notion, Zoom</p>
        </li>
        <li>
          <p><strong>Duration:</strong>Q4 2024</p>
        </li>
      </ul>
      <a href="https://synctrip.in/">
        <button className="caseStudyBtn contact clickable">
          <h5>View hi-fi prototype</h5>
          <div className="arrowDiv">
            <img src="/img/icon/arrowBlack.svg" alt="" className="arrow" />
            <img src="/img/icon/arrowBlack.svg" alt="" className="arrow2" />
          </div>
        </button>
      </a>
    </div>
  </div>
</div>
<div className="casestudyFeature container">
  <a href="#discover">
    <div>
      <h1>DISCOVER</h1>
      <ul>
        <li>Why travelers?</li>
        <li>How Do Travelers Use Their Time?</li>
        <li>What do they really want?</li>
        <li>The gap between behaviour and desire</li>
      </ul>
    </div>
  </a>
  <a href="#define">
    <div>
      <h1>DEFINE</h1>
      <ul>
        <li>What is the real problem?</li>
        <li>Rerouting the Research</li>
      </ul>
    </div>
  </a>
  <a href="#develop">
    <div>
      <h1>DEVELOP</h1>
      <ul>
        <li>Brainstorming Solution Ideas</li>
        <li>Prioritizing With an MVP Mindset</li>
        <li>Mid-Fidelity Prototype</li>
        <li>Yellow Flag: Overwhelming Text</li>
      </ul>
    </div>
  </a>

  <a href="#deliver">
    <div>
      <h1>DELIVER</h1>
      <ul>
        <li>How Does SyncTrip Solve Real User Needs?</li>
        <li>What I Learned</li>
      </ul>
    </div>
  </a>
</div>
<h1 className="casestudySectionTitle">Designing an app for Travellers</h1>
<div id="discover" className="discoverSection container">
  <div className="sectionHeading">
    <h3>DISCOVER</h3>
    <h1>Why a travel connection app?</h1>
  </div>
  <img
    className="sectionImg"
    src="/img/casestudy/casestudy1.png"
    alt="sectionImg"
  />
  <div className="sectionPara">
    <h1>Based on existing research on modern travel behavior:</h1>
    <h3>Travel planning today is extremely fragmented.</h3>
    <h3>
      Through early research, I saw the same pattern across every traveller type
      — from 26-year-old freelancers to 67-year-old retirees:
    </h3>
    <ul>
      <li>
        Plans live across WhatsApp, Google Docs, Airbnb, Spreadsheets, and
        Instagram saves.
      </li>
      <li>
        Finding travel partners is either awkward, unsafe, or simply unavailable
        as a feature.
      </li>
      <li>Group coordination breaks down because no one takes the lead.</li>
      <li>Planning tools focus on logistics, not connection.</li>
    </ul>
    <h3 className="bold">
      During early research, I realized something interesting:
    </h3>
    <h3>
      Even though the travel tech market is huge, there are still no platforms
      designed for:
    </h3>
    <ul>
      <li>Solo travelers who want company</li>
      <li>Small groups who want to expand their group</li>
      <li>Older adults or retirees who want community</li>
      <li>Working professionals who want synced schedules</li>
      <li>Anyone who wants shared energy, not random matches</li>
    </ul>
    <h3>
      Travel is social by nature — but travel planning is still fragmented,
      lonely, and scattered across apps.
    </h3>
    <h3>Synctrip aims to fix that.</h3>
    <h3 className="bold">The gap:</h3>
    <h3>
      No current tool lets travellers plan together and find aligned travellers
      in one place.
    </h3>
    <h3>
      Everything is either a travel app or a social app but never both. Synctrip
      fills this by blending the clarity of planning tools with the social
      familiarity of swipe mechanics.
    </h3>
  </div>
</div>
<h1 className="casestudySectionTitle">How do travelers use their time?</h1>
<div className="sectionPara container">
  <div className="sectionIconHeading">
    <img className="icon" src="/img/icon/asterick.png" alt="asterick_png" />
    <h1 className="bold">My Hypothesis</h1>
  </div>
  <h3>
    At the beginning, I believed Synctrip would
    <span className="bold">mostly serve young solo travelers .</span>
  </h3>
  <h3>
    But early interviews challenged this idea almost immediately. It became
    clear that the real problem wasn’t age or experience; it was the lack of a
    simple, shared space where people could find compatible co-travelers and
    plan trips without chaos.
  </h3>
  <div className="sectionImgContainer">
    <img
      className="company_groupicon"
      src="/img/casestudy/company_groupicon.png"
      alt="groupIcon"
    />
  </div>
  <div className="sectionIconHeading">
    <img className="icon" src="/img/icon/asterick.png" alt="asterick_png" />
    <h1 className="bold">Research</h1>
  </div>
  <h3 className="bold">Research Sources:</h3>
  <ul>
    <li>Reddit travel communities</li>
    <li>Instagram travel pages</li>
    <li>Chats with friends & travellers during trips</li>
    <li>Conversations with small travel groups</li>
    <li>Notes from casual interviews (5 personas captured)</li>
  </ul>
  <h3 className="bold">Sample:</h3>
  <h3>A wide age range — 20s, 30s, 40s, 50s, 60s</h3>
  <h3>Solo travellers, small groups, retirees, creative professionals</h3>
  <h3 className="bold">Research Questions:</h3>
  <h3>
    These questions guided every interview and shaped SyncTrip’s structure and
    tone:
  </h3>
  <ul>
    <li>How do you currently plan your trips?</li>
    <li>Where do your ideas and inspiration come from?</li>
    <li>What frustrates you the most during planning?</li>
    <li>
      How do you organise your saved content (reels, photos, links, notes)?
    </li>
    <li>What causes confusion or stress while planning?</li>
    <li>What makes you feel calm or “held” during the process?</li>
    <li>How do group plans break down, and when do they succeed?</li>
    <li>What makes you trust a recommendation—or ignore it?</li>
    <li>
      What would make you open a travel app every day, not just before a trip?
    </li>
  </ul>
  <h3 className="bold">Artifacts:</h3>
  <ul>
    <li>5 Personas (Aarav, Ananya, Ravi, Meera, Lucas)</li>
    <li>Affinity mapping</li>
    <li>Screenshots of real planning threads</li>
    <li>Notes from actual travel group behaviour</li>
  </ul>
  <div className="sectionIconHeading">
    <h1>Getting to know solo travelers through user interviews</h1>
  </div>
  <h3>
    I spoke with travellers across different age groups and life stages—solo
    travellers, small friend groups, retirees, and working professionals. Most
    of them travelled often but still struggled with connection, planning
    clarity, or coordinating with others.
  </h3>
  <h3>What I wanted to understand</h3>
  <ul>
    <li>How people of different ages actually make travel decisions</li>
    <li>Why planning feels overwhelming or confusing</li>
    <li>
      Whether travellers genuinely want to meet new people—or only when it feels
      safe and aligned
    </li>
    <li>How group plans fall apart (and why they work when they do)</li>
    <li>Whether existing tools solve anything beyond inspiration</li>
    <li>
      If “social discovery through travel” is something they find meaningful or
      risky
    </li>
  </ul>
  <h3>
    These conversations helped me shape clear, grounded personas—Aarav, Ananya,
    Ravi, Meera, and Lucas—and understand the emotional patterns behind how
    people plan trips, not just the functional ones.
  </h3>
</div>
<img
  className="userInterviewImg"
  src="/img/casestudy/userinterview.png"
  alt="userInterviewImg"
/>

<h3 className="headingPara">
  Affinity map of notes from the user interviews.
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://www.figma.com/board/nQVfzhmFbxALZRVTTKssej/Synctrip?node-id=3-583&t=8pzH7vIMKk3PzYi8-4"
  >
    View the affinity map via FigJam.
  </a>
</h3>
<div className="sectionPara container">
  <div className="sectionIconHeading">
    <h1>What do travellers ACTUALLY DO?</h1>
  </div>
  <ul>
    <li>
      4/5 users begin their travel planning by casually browsing content on
      Instagram, Pinterest, or Google just to “feel inspired” and mentally
      shortlist places without making any real bookings yet.
    </li>
    <li>
      3/5 users maintain travel checklists or personal notes in scattered places
      like WhatsApp saved messages, phone notes, or physical diaries before
      committing to a plan.
    </li>
    <li>
      4/5 users rely on friends or family availability before confirming a trip,
      which often leads to plans getting delayed or dropped due to misaligned
      schedules.
    </li>
    <li>
      3/5 users end up storing travel ideas for “later” but never revisit them
      due to lack of structured reminders or collaborative planning tools.
    </li>
  </ul>
</div>
<div className="sectionPara container">
  <div className="sectionIconHeading">
    <h1>What do travellers WANT?</h1>
  </div>
  <ul>
    <li>
      5/5 users want to travel more frequently rather than waiting for an annual
      big trip.
    </li>
    <li>
      4/5 users want to connect with people who share similar travel styles,
      budget ranges, and energy levels to avoid mismatched expectations during
      trips.
    </li>
    <li>
      3/5 users specifically expressed a desire for a system that helps with
      early-stage group coordination before bookings are made.
    </li>
    <li>
      4/5 users want to avoid being the only one responsible for organizing
      everything in a group, which often causes burnout and eventually ruins
      excitement for the trip.
    </li>
  </ul>
</div>
<div className="caseStudyBanner">
  <h1 className="bold">
    Is there a disconnect between what travellers want and what they actually
    do?
  </h1>
  <h2>
    According to user interviews, motivation to travel is already high. The real
    problem is coordination fatigue, scattered communication, and not finding
    the right people to go with.
  </h2>
</div>
<div className="sectionPara container">
  <div className="sectionIconHeading">
    <h1>The gap between behaviour and desire</h1>
  </div>
  <h3>The motivation to travel is already high.</h3>
  <h3>The real blockers are:</h3>
  <ul>
    <li>Coordination fatigue</li>
    <li>Scattered communication</li>
    <li>Lack of compatible co-travellers</li>
    <li>Unclear group decision structure</li>
  </ul>
  <h3>I realized my hypothesis was wrong.</h3>
  <h3>Synctrip isn’t only for young solo travellers.</h3>
  <h3>
    Older adults, retired travellers, and family-based planners also expressed a
    strong need for structured planning and aligned companionship.
  </h3>
  <h3>
    <span className="bold"> The challenge isn’t age! </span>
    it’s the absence of a platform that supports shared decision-making before a
    trip truly begins.
  </h3>
</div>
<h1 className="casestudySectionTitle">My hypothesis was wrong!</h1>
<div className="sectionPara container">
  <div className="sectionIconHeading">
    <h2 className="bold">
      I initially believed that Synctrip would primarily serve young travelers
    </h2>
  </div>
  <h3>Through interviews, I met:</h3>
  <ul>
    <li>Teachers who travel in small groups</li>
    <li>Retirees who want company</li>
    <li>Solo travellers who don’t want to feel lonely</li>
    <li>Small teams wanting smoother coordination</li>
  </ul>
  <h3>Synctrip is not age-based.</h3>
  <h3 className="bold">Synctrip is rhythm-based.</h3>
  <h3>
    It’s for anyone seeking aligned travel energy — not just young travellers.
  </h3>
  <h3>This reframed the entire product direction.</h3>
</div>
<div id="define" className="discoverSection container">
  <div className="sectionHeading">
    <h3>DEFINE</h3>
    <h1>Defining the actual problem</h1>
  </div>
  <div className="sectionPara">
    <h3>
      Travellers are willing and excited to explore, and they do have time or
      flexibility, but finding
      <span className="bold">
        compatible co-travellers and keeping coordination alive is the real
        barrier
      </span>
      stopping plans from turning into trips.
    </h3>
    <div className="card_caseStudy">
      <div>
        <h3>
          "I hate when 5 people say yes to a trip but no one wants to take the
          lead. The plan just dies in the chat."
        </h3>
        <h3 className="bold">– 31 year old user</h3>
      </div>
      <div>
        <h3>
          "I want to go on trips but my friends never match my excitement,
          budget or pace. I wish I could just find people who are already
          planning."
        </h3>
        <h3 className="bold">– 62 year old retired traveler</h3>
      </div>
    </div>

    <h1>Rerouting the research</h1>
    <h3 className="bold">
      New research focus: Social coordination layer in travel planning
    </h3>
    <h3>
      Now that the problem space was properly framed, the direction of research
      shifted with these core questions guiding the next phase:
    </h3>
    <ul>
      <li>
        How do people currently try to coordinate group trips and where does it
        fail?
      </li>
      <li>
        What trust or compatibility signals do users need before agreeing to
        travel with someone?
      </li>
      <li>
        How can a platform keep excitement and momentum alive between the “idea
        phase” and actual bookings?
      </li>

      <li>
        What communication and planning patterns lead to trips actually
        happening versus being abandoned?
      </li>
    </ul>

    <div className="sectionImgContainer">
      <img
        src="/img/casestudy/casestudy2.png"
        alt="sectionImg"
        className="sectionImg"
      />
    </div>
    <div className="sectionIconHeading">
      <img className="icon" src="/img/icon/asterick.png" alt="asterick_png" />
      <h1 className="bold">New Research Direction</h1>
    </div>
    <h3>Key questions now shifted to:</h3>
    <ul>
      <li>How do groups actually coordinate?</li>
      <li>
        What causes momentum loss between “let’s go” and “actually booking”?
      </li>
      <li>How do different age groups perceive trust?</li>
      <li>What signals make travel buddy discovery feel safe?</li>
      <li>How can planning feel like a conversation instead of a task?</li>
    </ul>
    <div className="sectionIconHeading">
      <img className="icon" src="/img/icon/asterick.png" alt="asterick_png" />
      <h1 className="bold">Research for the content</h1>
    </div>
    <h3>
      Before designing features, I needed to understand how people actually plan
      trips, not the polished version, but the messy real version that happens
      in group chats at 1:30 AM.
    </h3>
    <h3>
      So I studied trip planning behaviour through travel forums, group chat
      screenshots from participants, and user interviews. A repeating pattern
      surfaced:
    </h3>
    <ul>
      <li>
        Most group trips start with excitement but quickly turn into scattered
        decisions floating inside different chats, notes apps, and Google
        searches.
      </li>
      <li>
        People don’t lack places to go, they lack a shared workspace where
        everyone can contribute without chaos.
      </li>
      <li>
        Travel blogs and itinerary websites exist, but they are single-user
        oriented. Group travel still depends on one person copying links,
        collecting confirmations, and chasing people for decisions.
      </li>
    </ul>
    <h3>
      This helped me shape Synctrip not as just another itinerary tool, but as a
      shared decision space where everyone in the group can interact with the
      plan instead of just reacting to it.
    </h3>
    <div className="sectionImgContainer">
      <img
        src="/img/casestudy/casestudy3.png"
        alt="sectionImg"
        className="sectionImg"
      />
    </div>
    <h2 className="bold">Research for the method – Competitive review</h2>
    <h3>
      To position Synctrip properly, I reviewed three types of existing
      solutions:
    </h3>
    <ul>
      <li>
        <h3 className="bold">Google Docs / Notion trip templates</h3>
        Works for organization but feels too formal. People drop off because it
        feels like “work”, not trip planning.
      </li>
      <li>
        <h3 className="bold">WhatsApp group coordination</h3>
        Fast and familiar, but information sinks the moment it’s sent. Nothing
        stays structured. People keep asking “Final plan kya hai?” even after
        days of chatting.
      </li>
      <li>
        <h3 className="bold">Travel apps like TripIt, MakeMyTrip, Klook</h3>
        Good for bookings, but they treat planning as a personal checklist, not
        a shared group journey. No emotional collaboration layer.
      </li>
    </ul>
    <h3>
      Across all tools, the missing element is participation. There is no space
      where people can vote, react, pin ideas, lock dates, or track who's in and
      who's out.
    </h3>
    <h2 className="bold">Deep Dive Research</h2>
    <h3 className="bold">I analysed:</h3>
    <ul>
      <li>Real WhatsApp group threads</li>
      <li>Moment-by-moment behaviour of group planning</li>

      <li>How people save, share, shortlist, and postpone decisions</li>
      <li>Why older users drop off when screens have too much text</li>
      <li>Why Gen Z prefers swipe mechanics over scroll lists</li>
    </ul>

    <h3 className="bold">Core Patterns</h3>
    <ul>
      <li>People like visuals → they hate long cards</li>
      <li>One-focus-per-screen works better for all age groups</li>

      <li>When the process feels “heavy”, they abandon</li>
      <li>
        People need micro-confirmations (“who’s coming?”, “dates?”, “budget?”)
      </li>
    </ul>
    <div className="sectionImgContainer">
      <img
        src="/img/casestudy/casestudy3.png"
        alt="sectionImg"
        className="sectionImg"
      />
    </div>
    <h3 className="bold">Tools Checked</h3>
    <ul>
      <li>Google Docs</li>
      <li>Nortion</li>
      <li>Airbnb</li>
      <li>Tripato</li>
      <li>Trip Adviser</li>
      <li>Travel Buddy App</li>
      <li>Tinder</li>
    </ul>
    <h3 className="bold">Strengths Observed</h3>
    <ul>
      <li>Airbnb visual clarity</li>
      <li>Tinder’s effortless swipe</li>
      <li>Notion’s structured organisation</li>
      <li>WhatsApp’s familiarity</li>
    </ul>
    <h3 className="bold">Weaknesses Noticed</h3>
    <ul>
      <li>No shared decision-making</li>
      <li>No group-to-group matching</li>
      <li>No built-in date coordination</li>
      <li>No travel buddy discovery integrated with planning</li>
      <li>Itineraries overloaded with text</li>
    </ul>
    <h3 className="bold">Opportunity</h3>
    <h3>
      No app supports shared, interactive, multi-person planning + matching in
      one system.
    </h3>
  </div>
</div>
<h1 className="casestudySectionTitle">My hypothesis was wrong!</h1>
<div className="sectionPara container">
  <h2 className="bold">HMW (How Might We...)</h2>

  <ul>
    <li>How might we reduce decision fatigue during planning?</li>
    <li>How might we make choosing destinations intuitive?</li>

    <li>How might we make travel buddy discovery feel familiar but safe?</li>
    <li>How might we support both solo + group travellers in the same flow?</li>
    <li>
      How might we keep older users comfortable while keeping the interaction
      modern?
    </li>
  </ul>
  <div className="sectionImgContainer">
    <img
      src="/img/casestudy/casestudy5.png"
      alt="sectionImg"
      className="sectionImg"
    />
  </div>
  <h2 className="bold">Brainstorming solution ideas</h2>
  <h3>
    Using this HMW question as a filter, I started brainstorming different ways
    Synctrip could intervene in the current planning mess. I wrote down every
    possible interaction that could reduce friction between group members — from
    quick polls to synced calendars to playful “Are you actually coming?”
    confirmation nudges.
  </h3>
  <h3>
    But adding everything was not the goal. The goal was to reduce mental load,
    not add another complex tool that needs a tutorial to understand. So I used
    the research insights to define clear product goals that helped me eliminate
    anything that didn’t actively make group alignment smoother.
  </h3>
  <h2 className="bold">Product Goals</h2>
  <ul>
    <li>
      Make it easy for everyone in the group to see the plan taking shape in one
      place
    </li>
    <li>
      Replace endless “final dates???” messages with a shared confirmation flow
    </li>
    <li>
      Give non-planner members quick ways to participate without feeling
      responsible
    </li>
    <li>
      Reduce friction by letting people vote, react, and lock preferences in one
      tap
    </li>
    <li>
      Support the planner friend by shifting the planning from one-person task
      to visible group progress
    </li>
  </ul>
  <h2 className="bold">Brainstorming</h2>
  <h3 className="bold">Ideas explored:</h3>
  <ul>
    <li>Swipe-based destination shortlisting</li>
    <li>Group date-voting</li>
    <li>Itinerary builder broken by days with visible dates</li>
    <li>Travel mood tags</li>
    <li>A “Who’s Coming?” step after each plan</li>
    <li>Group-to-group matching</li>
    <li>Visual-first dashboard</li>
  </ul>
</div>
<h1 className="casestudySectionTitle">Prioritizing with an MVP mindset</h1>
<div className="sectionPara container">
  <h2 className="bold">So I asked a very direct question:</h2>
  <h3>
    What is the smallest version of Synctrip that still solves the chaos of
    group planning? This helped eliminate heavy features like shared packing
    lists or experience journals from early versions.
  </h3>
  <div className="sectionImgContainer">
    <img src="/img/casestudy/flowmap.png" alt="" className="sectionImg" />
  </div>
  <h1 className="">Took alot of messy conversations</h1>
  <h3 className="headingPara">But we were able to finalise a path</h3>
  <h3 className="bold">Included</h3>
  <ul>
    <li>Itinerary builder (day-wise + date-based)</li>
    <li>Dual calendar system</li>
    <li>Destination swipe shortlisting</li>
    <li>Trip dashboard</li>
    <li>Travel buddy discovery</li>
    <li>Group and solo matching</li>
    <li>Safe verified profiles</li>
    <li>Basic chat</li>
    <li>Mood tags</li>
    <li>Save lists</li>
  </ul>
  <h3 className="bold">Removed / Delayed</h3>
  <ul>
    <li>Advanced budgeting</li>
    <li>Automated bookings</li>
    <li>Multi-currency tools</li>
    <li>Social feed with reels/photos</li>
    <li>AI itinerary generation (planned for V2)</li>
  </ul>
  <h3>
    <span className="bold"> Reason:</span>

    These features add complexity without helping early flow validation.
  </h3>
</div>
<img className="algorithmImg" src="/img/casestudy/algorithm.png" alt="" />
<h3 className="headingPara">
  User flow.
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://www.figma.com/board/nQVfzhmFbxALZRVTTKssej/Synctrip?node-id=31-597&t=8pzH7vIMKk3PzYi8-4"
    >View the user flow via FigJam.</a
  >
</h3>
<div id="develop" className="developSection container">
  <div className="sectionHeading">
    <h3>DEVELOP</h3>
    <h1>Where and how will users achieve these product goals?</h1>
  </div>
  <div className="sectionPara">
    <h3>
      To answer that, I started mapping an early sitemap structure, referencing
      how users currently navigate through trip planning using WhatsApp chats,
      Google Docs and mental notes. Instead of copying competitor flows, I used
      conversation-like hierarchy — the way trips actually start:
    </h3>
    <h3 className="bold">
      Home → Start Plan → Destination Swipe → Date Selection → Itinerary Builder
      → Invite → Trip Dashboard → Sync + Travel
    </h3>
    <h3>
      Before detailing every branch of the app, I focused only on the essential
      touchpoints that would need to exist to test if Synctrip actually reduces
      planning fatigue.
    </h3>
    <h3 className="bold">The IA respects natural behaviour:</h3>
    <h3>visual → choose → sync → refine.</h3>
    <h3>Everything stays linear, soft, and low-stress.</h3>
    <div className="sectionIconHeading">
      <img className="icon" src="/img/icon/asterick.png" alt="asterick_png" />
      <h1 className="bold">Respecting existing user behaviour</h1>
    </div>
    <h3>
      From research, 4/5 users already start trip planning in WhatsApp to “float
      the idea first.” Instead of forcing them to abandon their natural
      behaviour, I introduced a “Convert Chat to Plan” entry point — a way to
      turn an existing idea or chat link into a Synctrip board instantly.
    </h3>
    <h3>
      This became the first user flow I developed — because onboarding should
      feel like a continuation of their existing habit, not a fresh start.
    </h3>
    <h3>
      <span className="bold"> Example flow: </span>
      User drops a trip idea in chat → Taps “Sync this plan” → Synctrip
      generates a shared planning board with built-in voting
    </h3>
    <div className="sectionImgContainer">
      <img
        src="/img/casestudy/casestudy6.png"
        alt="sectionImg"
        className="sectionImg"
      />
    </div>

    <div className="sectionIconHeading">
      <img className="icon" src="/img/icon/asterick.png" alt="asterick_png" />
      <h1 className="bold">Primary flows for usability testing</h1>
    </div>
    <h3>
      To test whether Synctrip actually reduces back-and-forth frustration, I
      prioritized these core flows for usability testing:
    </h3>

    <ul>
      <li>
        Start a trip plan and invite people without leaving the group chat
      </li>
      <li>Set up a date voting session and watch how the group interacts</li>
      <li>See how users respond to the “Who’s actually coming?” toggle</li>
      <li>
        Check if the trip dashboard actually reduces repeated questions like
        “Final plan? Budget? Dates?”
      </li>
    </ul>
    <h3>
      These flows directly map back to the product goals and allow me to see if
      the app is doing what it promised — making planning feel shared, not
      scattered.
    </h3>
  </div>
</div>

<h1 className="casestudySectionTitle">Finding design patterns for every element</h1>

<img
  className="userInterviewImg"
  src="/img/casestudy/52c938b246751e9b0184802b354c6fa967c68224.png"
  alt="userInterviewImg"
/>

<div className="sectionPara container">
  <h2 className="bold">Inspiration to Prototype</h2>
  <h3>
    For the first round of Synctrip sketches, I placed quick wireframes
    alongside interface patterns from well-known travel and lifestyle platforms
    to study interactions that already feel intuitive to users.
  </h3>
  <h3>
    I drew inspiration from Swiggy’s straightforward decision-making flows,
    Airbnb’s clear and confidence-building layouts, Trip.com’s structured search
    and booking patterns, and the way Marriott Bonvoy simplifies complex travel
    information without overwhelming the user. These references helped guide
    early choices around navigation, hierarchy, and interaction so the
    experience felt familiar from the very first use.
  </h3>
  <h3>
    This inspiration phase made the shift from low-fidelity to mid-fidelity
    designs far more seamless. Because the foundation was built on proven user
    behaviors rather than experimental patterns, the overall structure remained
    strong and consistent as the design evolved.
  </h3>
</div>
<img
  className="userInterviewImg"
  src="/img/casestudy/73d6613465ed8ada16b9f38047f3561151454855.png"
  alt="userInterviewImg"
/>

<div className="sectionPara container">
  <h2 className="bold">Yellow flag: Overwhelming text</h2>
  <h3>
    While shaping the trip board, I noticed that the itinerary section quickly
    became a wall of text. Most travel apps present the plan as one long
    paragraph, and during testing this made users skim or ignore important
    details.
  </h3>

  <h3>I wanted the itinerary to feel lighter and easier to navigate.</h3>
  <h3>
    So instead of one continuous block, I split the plan into day based
    segments. This mirrors how travelers naturally think about their trips and
    reduces cognitive load. Users can tap into one day at a time without feeling
    rushed or overwhelmed.
  </h3>
  <h3>
    I marked this change as a yellow flag for testing because I wanted to see if
    users would understand the new format instantly or still expect the
    traditional long itinerary. Early feedback showed that breaking it down by
    days gave users more control and made the trip feel clearer.
  </h3>
  <div className="sectionIconHeading">
    <img className="icon" src="/img/icon/asterick.png" alt="asterick_png" />
    <h1 className="bold">How this improves navigation</h1>
  </div>
  <h3>
    Breaking the itinerary into days did more than reduce text. It changed how
    users moved through the plan. Instead of scrolling repeatedly to find one
    detail, they could jump directly to the exact day they cared about.
  </h3>

  <h3>
    This also made it easier for groups to discuss plans. When someone said
    check day three, everyone knew exactly where to go without searching through
    a long list.
  </h3>
  <h3>
    During quick tests, users naturally tapped through the day tabs without
    needing cues. The structure matched their mental model, so the navigation
    felt simple and familiar.
  </h3>
</div>
<h1 className="casestudySectionTitle">Iterating based on usability test results</h1>
<div className="sectionPara container">
  <h2 className="bold">Red flag: Limited calendar visibility</h2>
  <h3>
    The initial design showed only one month at a time. I assumed this was
    enough because most users usually plan short trips and would select dates
    within a single month.
  </h3>
  <h3>However, this created a major limitation:</h3>
  <ul>
    <li>Users couldn’t see that trips could span two months</li>
    <li>Longer plans felt confusing</li>
    <li>
      There was no clear indication of how date ranges were being selected
    </li>
    <li>Users had to manually navigate back and forth to compare dates</li>
  </ul>
  <h3>
    During usability testing, it became clear that users expected to view a
    broader timeline at once. The single-month view made the experience feel
    restrictive and caused uncertainty.
  </h3>
  <h3>
    To fix this, I replaced the one-month layout with a two-month view that
    shows a full range at a glance. Dates now highlight immediately when
    selected, reducing confusion about what is included in the trip.
  </h3>
  <div className="sectionImgContainer">
    <img src="/img/casestudy/phone.png" alt="sectionImg" className="sectionImg" />
  </div>
  <h3 className="bold">Priority revisions</h3>
  <h3>
    Testing surfaced multiple opportunities to improve clarity and reduce
    misclicks. I evaluated each issue based on impact, frequency, and the effort
    required to resolve it.
  </h3>
  <h3>
    Most users were able to select dates, but the experience felt unclear.
    Expanding the visible calendar and improving selection feedback helped users
    feel more confident and aware of the trip range they were choosing.
  </h3>
</div>
<h1 className="casestudySectionTitle">Making group travel easier with SyncTrip</h1>

<div id="deliver" className="container">
  <div className="sectionHeading">
    <h3>DELIVER</h3>
    <h1>
      How does SyncTrip solve <br />
      real user needs?
    </h1>
  </div>
  <div className="sectionPara">
    <h3 className="bold">The problem:</h3>
    <h3>
      The problem:Planning a trip, especially with a group, has always been a
      messy multi-app process. People jump between WhatsApp chats, Google
      Sheets, Docs, screenshots, links, budgets, and endless back-and-forth
      messages. Information gets lost, decisions get delayed, and the confusion
      often leads to dropped plans or cancelled trips altogether.
    </h3>
    <h3 className="bold">The solution:</h3>
    <h3>
      The solution: SyncTrip brings everything together into one destination for
      organising and planning travel. Users get all the tools and assets they
      need in a single place — dates, budgets, voting, itinerary planning,
      reminders, and tracking — without switching apps. It also works as a
      social platform where strangers with similar travel interests can connect,
      organise trips, and plan confidently as a group.
    </h3>
    <div className="sectionImgContainer">
      <img
        src="/img/casestudy/phone2.png"
        alt="sectionImg"
        className="sectionImg"
      />
    </div>
  </div>
</div>
<div className="container caseStudyDataContainer">
  <div className="learned">
    <h1>What I learned</h1>
    <div className="sectionIconHeading">
      <img className="icon" src="/img/icon/asterick.png" alt="asterick_png" />
      <h4>
        Looking at existing research before interviews helped me enter the
        conversations with some direction, and revisiting it afterward made the
        insights sharper and the competitors clearer.
      </h4>
    </div>
    <div className="sectionIconHeading">
      <img className="icon" src="/img/icon/asterick.png" alt="asterick_png" />
      <h4>
        Spending time upfront on design references saved me later the wireframes
        came together quicker because I already knew what felt right.
      </h4>
    </div>
    <div className="sectionIconHeading">
      <img className="icon" src="/img/icon/asterick.png" alt="asterick_png" />
      <h4>
        And for branding, starting with what I didn’t want was surprisingly
        helpful. It cleared the noise and made it easier to see the direction
        Synctrip should take.
      </h4>
    </div>
  </div>
  <div>
    <img src="/img/casestudy/happy.png" alt="happy" className="happyPng" />
  </div>
</div>
<div className="nextProject container">
  <h3>Next Project</h3>
  <h1>EXAM HUB</h1>
  <h4>End-to-end responsive website + branding</h4>
</div>
<div className="caseStudyEnd">
  <h1>Thank you for your interest in my work!</h1>
  <h3>Made with lassi & spicy chips :)</h3>
</div>
    </>
  );
}
