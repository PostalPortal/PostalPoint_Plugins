import jsdoc2md from 'jsdoc-to-markdown';
import { promises as fs } from 'node:fs';
import path from 'path';

/* input and output paths */
const inputFiles = process.argv.slice(2);
const docroot = "./docs/Plugin API";

/* get template data */
const templateData = await jsdoc2md.getTemplateData({ files: inputFiles });

/* reduce templateData to an array of class names */
const namespaces = templateData.filter(i => i.kind === 'namespace');
const globals = templateData.filter(i => (i.kind === 'constant' || i.kind === 'function') && i.scope === "global");

var template, output;

/* create a documentation file for each class */
for (const namespace of namespaces) {
  //console.log(namespace);
  template = `{{#namespace longname="${namespace.longname}"}}{{>docs}}{{/namespace}}`;
  console.log(`rendering ${namespace.longname}`);
  output = await jsdoc2md.render({ data: templateData, template: template, "example-lang": "js" });
  const isPrimaryFile = namespace.longname == namespace.name;
  const folder = namespace.longname.split(".").slice(0, -1).join("/");
  await fs.mkdir(path.resolve(`${docroot}/${folder}`), {recursive: true});
  if (isPrimaryFile) {
    await fs.writeFile(path.resolve(`${docroot}/${namespace.name}.md`), output);
  } else {
    //const folder = namespace.longname.split(".").slice(0, -1).join("/");
    //await fs.mkdir(path.resolve(`${docroot}/${folder}`), {recursive: true});
    //await fs.writeFile(path.resolve(`${docroot}/${folder}/${namespace.name}.md`), output);
  }
}

template = "";
console.log(`rendering globals`);
for (const glob of globals) {
  //console.log(namespace);
  template += `{{#globals longname="${glob.longname}"}}{{>docs}}{{/globals}}`;
}
output = await jsdoc2md.render({ data: templateData, template: template, "example-lang": "js" });
await fs.writeFile(path.resolve(`${docroot}/global functions.md`), output);
