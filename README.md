# Bolt

Welcome in **Bolt**.

When you see lightning you ever think: _"Where will fall? What did he hit?"_.

If the answer at this question is yes, then this is the app that suits you.

By calculating the speed of sound according to the atmospheric temperature in your city and the time difference between "light" and "sound" of thunder you can discover how many meters or kilometers fell.

Enjoy!

## How to install
There are 2 ways

1. Compile it yourself.
2. Download latest release for your OS.

### Compiling
Clone or download this repo and do the following.

#### Bash
```bash
  # Warning this code was tested only on OSX 10.11
  cd Bolt
  npm install
  npm start # to run preview
  electron-packager . --appname Bolt --appversion 0.1.0 --appicon ./app/img/app-icon.icns --overwrite --out ~/Desktop --all  # "npm install electron-packager -g" if is not installed
```

## Other
:star: **Electron** Framework <br>
:star: **Atom**, an awsome text editor


### License [MIT](LICENSE.md)

Copyright (c) 2016 Rawnly

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
