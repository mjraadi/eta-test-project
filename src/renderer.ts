import * as eta from "eta";
import path from "path";
import fs from "fs";
import { readDirectoryAndReturnFileNames } from "./utils";

interface RenderEmailTemplateOptions {
  fileName: string;
  data?: Record<string, any>;
}

interface RenderedEmailTemplate {
  templateName: string;
  renderedTemplate: string | void;
}

eta.configure({
  views: path.join(__dirname, "templates"),
});

const readEmailTemplates = () => {
  const result = readDirectoryAndReturnFileNames({
    path: path.join(__dirname, "templates", "emails"),
  });
  return result.children;
};

const renderEmailTemplate = async (
  options: RenderEmailTemplateOptions
): Promise<RenderedEmailTemplate> => {
  const { data, fileName } = options;
  const templateName = fileName.replace(/\.[^/.]+$/, "");
  try {
    const renderedTemplate = await eta.renderFileAsync(`emails/${fileName}`, {
      ...data,
    });

    return {
      templateName,
      renderedTemplate,
    };
  } catch (error) {
    throw error;
  }
};

export const renderEmailTemplates = async () => {
  const emailTemplates = readEmailTemplates();
  const promises = emailTemplates?.map((template) =>
    renderEmailTemplate({
      fileName: template.name,
      data: {
        message: "Message",
        title: "Title",
      },
    })
  );

  const renderedTemplates = await Promise.all(promises || []);

  return renderedTemplates;
};

export const writeRenderedEmailTemplates = async (
  templates: RenderedEmailTemplate[]
): Promise<void> => {
  templates.forEach((template) => {
    fs.writeFileSync(
      path.join(__dirname, "..", "out", `${template.templateName}.html`),
      template.renderedTemplate || ""
    );
  });
};
