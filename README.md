# my resume in markdown
Because reasons.

## stuff

* `resume.md` - the resume
* `resume.css` - the style

### prerequisites
Prerequisites are installed with `$ make install`. Command assumes OSX with [Homebrew](http://brew.sh/).

* make
* watchman
* discount
* WeasyPrint
  * Depends on Python, Cairo, Pango, gdk-pixbuf, libxml2, libxslt, and libffi

### python and virtualenv
WeasyPrint runs on Python. This project uses [pyenv](https://github.com/yyuu/pyenv) and [pyenv-virtualenv](https://github.com/yyuu/pyenv-virtualenv) to manage the Python version and virtual environment, respectively. `$ make install` will install both tools (along with all other dependencies) and create the virtual environment to install WeasyPrint in.

### how-to

* `$ make install` - installs dependencies and creates a fancy python virtualenv
* `$ make` - makes a fancy html and pdf of the resume
* `$ make clean` - deletes the fancy html and pdf of the resume
* `$ make publish` - publishes the fancy html and pdf of the resume to the `gh-pages` branch

### license
Pretty sure there's really nothing to see here, but if there is, do whatever you want with it.
