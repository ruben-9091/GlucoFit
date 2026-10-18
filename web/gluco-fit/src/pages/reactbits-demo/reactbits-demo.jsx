import PageLayout from "../../components/layout/page-layout/page-layout";
import { Aurora, GradientText } from "../../components/ui";

import "./reactbits-demo.css";

// Colores tomados de tu tema (home-page.css: #63212a -> #a29f9e, + el dorado #cd8d27 de las partículas)
const THEME_STOPS = ["#63212a", "#cd8d27", "#a29f9e"];

// Snippet listo para pegar en home-page.jsx (o en cualquier página).
// Nota: probado sobre el flavour JS-CSS de ReactBits, sin Tailwind y sin dependencias nuevas.
const SNIPPET = `// 1) Importa los componentes (ya están exportados en src/components/ui/index.jsx)
import { Aurora, GradientText } from "../../components/ui";

// 2) Título con degradado animado (sustituye tu <h2 className="modern-title">)
<GradientText
  colors={["#63212a", "#cd8d27", "#a29f9e"]}
  animationSpeed={6}
  variant="linear"        // "linear" | "flow" | "conic"
  angle={90}
  yoyo
  glow={0.25}
>
  <h2 className="m-0" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "50px" }}>
    Tu salud, tu control, tu bienestar
  </h2>
</GradientText>

// 3) Aurora como fondo de una sección
//    El contenedor padre necesita altura + overflow hidden; Aurora se superpone con position absolute.
<div className="position-relative rounded-4 overflow-hidden" style={{ minHeight: "320px" }}>
  <Aurora
    colorStops={["#63212a", "#cd8d27", "#a29f9e"]}
    lightMode              // fondo claro (tu caso). Quítalo para fondo oscuro.
    speed={0.7}
    amplitude={1.1}
    blend={0.6}
    height={0.55}
    glow={0.7}
    style={{ position: "absolute", inset: 0 }}
  />
  <div className="position-relative p-4" style={{ zIndex: 1 }}>
    ...tu contenido...
  </div>
</div>`;

function ReactBitsDemo() {
  return (
    <PageLayout>
      <div className="py-4">
        <h1 className="rb-demo__heading">ReactBits · laboratorio</h1>
        <p className="rb-demo__lead">
          Dos componentes copiados del flavour <strong>JS-CSS</strong> (CSS plano, sin Tailwind y sin
          dependencias nuevas) en <code>src/components/ui/reactbits/</code>. Página pública en{" "}
          <code>/reactbits</code> para trastear sin tocar el resto de la app.
        </p>

        {/* 1. Aurora en claro (look integrado con el tema de la app) */}
        <section className="rb-demo__section">
          <h2 className="rb-demo__section-title">1. Aurora · lightMode (look integrado)</h2>
          <div className="rb-demo__stage rb-demo__stage--light">
            <Aurora
              colorStops={THEME_STOPS}
              lightMode
              amplitude={1.1}
              blend={0.6}
              speed={0.7}
              height={0.55}
              glow={0.7}
            />
            <div className="rb-demo__content d-flex flex-column align-items-center justify-content-center h-100 p-4 text-center">
              <GradientText
                colors={THEME_STOPS}
                animationSpeed={6}
                variant="linear"
                angle={90}
                yoyo
                glow={0.25}
              >
                <h3 className="rb-demo__title-preview">Tu salud, tu control, tu bienestar</h3>
              </GradientText>
              <p className="mb-0 mt-2 rb-demo__hint">
                GradientText sobre Aurora · mueve el ratón dentro del recuadro (reacciona al puntero)
              </p>
            </div>
          </div>
        </section>

        {/* 2. Aurora en oscuro, para ver el glow de verdad */}
        <section className="rb-demo__section">
          <h2 className="rb-demo__section-title">2. Aurora · fondo oscuro (glow completo)</h2>
          <div className="rb-demo__stage rb-demo__stage--dark">
            <Aurora
              colorStops={["#5227FF", "#7cff67", "#5227FF"]}
              speed={1}
              amplitude={1.2}
              blend={0.5}
              height={0.45}
              glow={0.9}
              layers={2}
            />
            <div className="rb-demo__content rb-demo__content--on-dark d-flex align-items-end p-4 h-100">
              <span className="rb-demo__badge">colorStops por defecto de ReactBits</span>
            </div>
          </div>
        </section>

        {/* 3. GradientText aislado */}
        <section className="rb-demo__section">
          <h2 className="rb-demo__section-title">3. GradientText · variantes</h2>
          <div className="rb-demo__variants">
            <GradientText colors={THEME_STOPS} variant="linear" angle={90} animationSpeed={6}>
              <span className="rb-demo__variant-label">linear</span>
            </GradientText>
            <GradientText colors={THEME_STOPS} variant="flow" animationSpeed={5} scale={3}>
              <span className="rb-demo__variant-label">flow</span>
            </GradientText>
            <GradientText colors={THEME_STOPS} variant="conic" animationSpeed={5} yoyo>
              <span className="rb-demo__variant-label">conic</span>
            </GradientText>
          </div>
        </section>

        {/* 4. Snippet */}
        <section className="rb-demo__section mb-0">
          <h2 className="rb-demo__section-title">4. Cópialo a tus páginas</h2>
          <pre className="rb-demo__code">
            <code>{SNIPPET}</code>
          </pre>
          <p className="rb-demo__hint mb-0">
            Para añadir más componentes: en reactbits.dev elige la pestaña <strong>JS-CSS</strong>, copia
            el <code>.jsx</code> y el <code>.css</code> a{" "}
            <code>src/components/ui/reactbits/&lt;nombre&gt;/</code>, ajusta el import del CSS a
            kebab-case y expórtalo en <code>src/components/ui/index.jsx</code>.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}

export default ReactBitsDemo;
