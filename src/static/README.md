# Bug Book

##Project Info:

Setup:
- Install Node Modules and Bower Components.
    - `npm install`
    - `bower install`

Coding, testing:
- Spins up a server, starts compass, auto refreshes on save.
	- `grunt server`

- Runs JSLint, maybe other validations down the road.
	- `grunt check`

Build:
- Compresses and concatenates all files and copies them to ./dist.
	- `grunt build`

Deploy:
- Deploys the built code to deploy/site/_files
	- `grunt deploy`


##Conventions
1) Modules
- module names must match for both the `.hbs` and `.scss`.
 - ex: `assemble/modules/_global-footer.hbs` & `sass/modules/_global-footer.scss`
- class names match module names
 - ex: `_global-footer.hbs` => `.global-footer { // }`

2) Partials
- Nest partials in related groups, followed by the group name, without a preceeding `_`
 - ex: `assemble/partials/header/contact-header.hbs`
 - ex: `assemble/partials/carousel/controls-carousel.hbs`
- Same conventions for Sass, but with a preceding `_`
 - ex: `sass/partials/header/_contact-header.scss`
- Add partial and module sass files in `main.scss` under their respective "partials" or "modules" sections.

(Note: Use generators to produce new modules, partials, and templates, as they help enforce conventions.)

3) Never write static text. Always reference JSON (or possibly XML) data via a helper
 - ex: `<p>{{company.name.first-name}}</p>` instead of `<p>Barkley</p>
