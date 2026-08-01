const features = [
  {
    number: "01",
    title: "فكرة مناسبة فعلًا",
    text: "أفكار مقترحة حسب تخصصك، مهارات فريقك والوقت المتاح، مع تقييم واضح للصعوبة والقيمة.",
    color: "lime",
  },
  {
    number: "02",
    title: "خطة من غير دوشة",
    text: "نحوّل الفكرة إلى مراحل ومهام ومواعيد، ونوزّع المسؤوليات على الفريق من أول يوم.",
    color: "violet",
  },
  {
    number: "03",
    title: "توثيق مرتب",
    text: "قوالب للتقرير والمراجع والرسومات، ومراجعة مستمرة قبل كل تسليم بدل ضغط آخر أسبوع.",
    color: "orange",
  },
  {
    number: "04",
    title: "جاهز للمناقشة",
    text: "عرض تقديمي منظم، توزيع أدوار، وأسئلة متوقعة تساعد كل عضو يدخل المناقشة واثقًا.",
    color: "blue",
  },
];

const steps = [
  ["عرّفنا بفريقك", "اختار تخصصك، أضف مهارات الأعضاء ومتطلبات الجامعة."],
  ["اختار فكرتك", "قارن الأفكار وحدد النطاق المناسب قبل ما تبدأ التنفيذ."],
  ["امشِ على الخطة", "نفّذ المهام وتابع التقدم والتسليمات من لوحة واحدة."],
  ["سلّم بثقة", "راجع التوثيق، اختبر المشروع واتدرّب على المناقشة."],
];

const tools = [
  ["✦", "مساعد ذكي", "يفهم مشروعك ويقترح الخطوة التالية بدون إجابات عامة."],
  ["✓", "إدارة المهام", "مهام واضحة، مسؤول لكل مهمة وتنبيه قبل الموعد."],
  ["⌁", "مساحة الفريق", "ملفات واجتماعات وقرارات الفريق محفوظة في مكان واحد."],
  ["◫", "قوالب أكاديمية", "مقترح المشروع والتقرير والعرض حسب متطلبات الجامعة."],
  ["↗", "متابعة المشرف", "ملاحظات واعتمادات ومتابعة للتقدم من غير رسائل ضائعة."],
  ["◎", "تدريب المناقشة", "أسئلة متوقعة، سيناريو للعرض وخطة بديلة لأي مشكلة."],
];

function ArrowIcon() {
  return <span aria-hidden="true">←</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="مشروعي - الصفحة الرئيسية">
          <span className="brand-mark">م</span>
          <span>مشروعي</span>
        </a>
        <nav aria-label="التنقل الرئيسي">
          <a href="#features">المميزات</a>
          <a href="#journey">كيف تعمل؟</a>
          <a href="#tools">الأدوات</a>
        </nav>
        <a className="header-cta" href="#start">ابدأ مشروعك <ArrowIcon /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span>●</span> شريكك في مشروع التخرج</div>
          <h1>من أول <em>فكرة</em><br />لحد يوم <span>المناقشة.</span></h1>
          <p>
            كل اللي فريقك محتاجه عشان يخطط، ينفّذ، يوثّق ويعرض مشروع التخرج — في مكان واحد وبخطوات واضحة.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#journey">ابدأ الرحلة مجانًا <ArrowIcon /></a>
            <a className="text-button" href="#features">اكتشف المنصة <span aria-hidden="true">↓</span></a>
          </div>
          <div className="trust-row">
            <div className="avatars" aria-hidden="true">
              <span>أ</span><span>م</span><span>س</span><span>+</span>
            </div>
            <p><strong>كل فريق له طريقته</strong><br />خطة مرنة حسب تخصصك ووقتك</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="مثال للوحة متابعة المشروع">
          <div className="shape shape-one" />
          <div className="shape shape-two" />
          <div className="dashboard-card">
            <div className="dash-top">
              <div>
                <small>مشروع الفريق</small>
                <h2>نظام ذكي لإدارة الطاقة</h2>
              </div>
              <button type="button" aria-label="المزيد">•••</button>
            </div>
            <div className="progress-head"><span>التقدم الكلي</span><strong>68%</strong></div>
            <div className="progress"><span /></div>
            <div className="dash-grid">
              <article>
                <small>المهمة الحالية</small>
                <strong>اختبار النموذج الأولي</strong>
                <div className="mini-tags"><span>قيد التنفيذ</span><b>باقي 3 أيام</b></div>
              </article>
              <article className="next-card">
                <small>التسليم القادم</small>
                <strong>الفصل الثالث</strong>
                <time>12 نوفمبر</time>
              </article>
            </div>
            <div className="team-line">
              <div><span>أ</span><span>ي</span><span>ك</span></div>
              <p><strong>3 من 4</strong> مهام هذا الأسبوع</p>
              <i>✓</i>
            </div>
          </div>
          <div className="floating-note note-one"><b>✓</b><span>تم اعتماد الفكرة<small>من د. أحمد منذ ساعتين</small></span></div>
          <div className="floating-note note-two"><b>✦</b><span>اقتراح ذكي<small>قسّم مرحلة الاختبار لمهمتين</small></span></div>
        </div>
      </section>

      <section className="features section" id="features">
        <div className="section-heading">
          <div><span className="kicker">كل خطوة محسوبة</span><h2>مشروعك كبير.<br /><em>بس مش لازم يبقى معقّد.</em></h2></div>
          <p>رتّبنا لك الرحلة كاملة عشان تركز على شغلك وتعرف دائمًا إيه الخطوة الجاية.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className={`feature-card ${feature.color}`} key={feature.number}>
              <span className="feature-number">{feature.number}</span>
              <div className="feature-icon" aria-hidden="true">{feature.number === "01" ? "✦" : feature.number === "02" ? "☷" : feature.number === "03" ? "▤" : "◉"}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="journey section" id="journey">
        <div className="journey-intro">
          <span className="kicker light">من أين تبدأ؟</span>
          <h2>أربع محطات،<br /><em>ومشروع كامل.</em></h2>
          <p>منصة واحدة تمشي معاك من لحظة تكوين الفريق لحد آخر سؤال في المناقشة.</p>
          <a href="#start">ابدأ من المحطة الأولى <ArrowIcon /></a>
        </div>
        <ol className="steps">
          {steps.map(([title, text], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="tools section" id="tools">
        <div className="center-heading">
          <span className="kicker">أدوات تعرف مشروعك</span>
          <h2>كل حاجة محتاجها.<br /><em>ولا حاجة تشتّتك.</em></h2>
        </div>
        <div className="tools-grid">
          {tools.map(([icon, title, text]) => (
            <article key={title}><span aria-hidden="true">{icon}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="integrity section">
        <div className="integrity-badge">✓</div>
        <div>
          <span className="kicker">مساعدة تحترم مجهودك</span>
          <h2>إحنا بنسهّل الطريق،<br /><em>وإنت صاحب المشروع.</em></h2>
        </div>
        <p>مشروعي يساعدك تفهم وتخطط وتراجع. كل قرار وكل سطر في مشروعك يفضل مسؤوليتك، عشان تتعلم بجد وتدخل المناقشة وأنت فاهم شغلك.</p>
      </section>

      <section className="cta-section section" id="start">
        <span className="cta-orbit orbit-one" /><span className="cta-orbit orbit-two" />
        <div className="cta-content">
          <span className="kicker light">جاهز تبدأ؟</span>
          <h2>فكرتك تستاهل<br /><em>تطلع للنور.</em></h2>
          <p>ابدأ بخطوة صغيرة النهارده، وخلي كل خطوة بعدها أوضح.</p>
          <a href="https://github.com/crtragency/graduation">تابع تطور المشروع <ArrowIcon /></a>
          <small>النسخة الأولى قيد التجهيز — تابع المستودع وكن من أوائل المستخدمين.</small>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">م</span><span>مشروعي</span></a>
        <p>من الفكرة للمناقشة، خطوة بخطوة.</p>
        <div><a href="#features">المميزات</a><a href="#journey">الرحلة</a><a href="#tools">الأدوات</a></div>
        <small>© 2026 مشروعي. منصة لدعم التعلم والنزاهة الأكاديمية.</small>
      </footer>
    </main>
  );
}
