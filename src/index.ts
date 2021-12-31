import { renderEmailTemplates, writeRenderedEmailTemplates } from "./renderer";

(async () => {
  const renderedTemplates = await renderEmailTemplates();
  await writeRenderedEmailTemplates(renderedTemplates);
})();
