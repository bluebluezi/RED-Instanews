# Project 3 Instanews

The project is a web application that displays a grid of 12 articles' thumbnail and their respective abstract, by NYT's Top Stories API.

## Personal Learnings

The project is a demonstration of one's understanding of Ajax, jQuery, and CSS grid and animations.

The greatest takeaway from this project is the appreciation and understanding of development tools setup. Amidst the chaos of technical jargons and actual coding tasks, one may find the package installation confusing. For the longest time, I thought Sass and jQuery were its own language!!!

Sass is a CSS preprocessor and has features (variables, mixins, NESTING OF CSS code, etc) that simplifies CSS tasks! Gulp is a task automator that relies on a gulpfile.js which defines which tasks to automate and how they are automated. Here are the tasks specified in our gulpfile.js. Gulp watches for changes in either the sass files (also known as partials) or the javascript files and would generate new files (css, css minified and javascript minified) within the 'build' folder. The html would link to these files within instead of the code we are modifying. Meanwhile (well, within milliseconds), it would sync with the browser so that we don't have to refresh constantly.


## Built With

* Font Awesome - Used to generate social media icons
* Transfonter - Used to generate @font-face for custom font support
* Top Stories API by New York Times - Used to pull required data to generate article images and their abstracts
* Select2 - Plug-in that overides the styling of dropdown menu 

### Prerequisites

Npm (I used Yarn), Sass, Gulp, jQuery


### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo



## Acknowledgements

* Stack Overflow Community

## Future iteration proposal

* Scroll to top of article grid after loading
* Add gradients and/or shadows to soften edges between each article's cell



