# SASS Boilerplate

https://github.com/BarkleyREI/sass_boilerplate

Do not make direct edits to this repository.

Fork the repository and make your edits on your copy, then do a pull request on GitHub.

## Contributing

Add mixins to helpers/_mixins.scss

Add any common QA res CSS you do to helpers/_common.scss

Don't think these are the limits. If you can think of anything else to include, do it!!

## Contents

### Helpers

#### Color Palette
Color palette is a mixin from IBM that lets you organize colors inside a SASS mapping. I find that it is an easier way to manage colors rather than a long list of variable names. I highly recommend using it. It's not difficult to use.

There are examples of how to use it peppered into some of the default common styles.

Use this file to store common values like font size, z index, etc.

#### Common

Common QA-fixes and default styles for common elements. This section is for *global* styles that affect elements on the entire site and are not likely to be overridden.

#### Mixins

Mixins for use on the entire site.

Please also make use of Foundation mixins whenever possible.

### Layout

Place layout based SCSS files here. A layout should only be positioning or context specific styles for a very specific situation.

### Modules

Modules are multi-use components of the site that can appear one or more times.

### Partials

Partials are smaller multi-use components that often are smaller pieces of modules, and are generally not found by themselves.

### Print

Print styles. Print styles are important. Do not forget to write print styles.
