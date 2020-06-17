# Z8 Template Project Build How-to

Copy _gradle.properties.default_ to _gradle.properties_ then choose one of project building options.

You have 2 options to develope Z8 porject:
1. Using Z8 Project sources from Git - _z8.home_ must point to Z8 Project folder, Gradle build script assumes Z8 Project is in Eclipse workspace
1. Using Z8 Project binaries - _z8Home_ must not be set

Eclipse workspace configuration:
1. If you use Z8 Project sources, Z8 Project must be in the same workspace.
1. If you use Z8 Project binaries, subproject _org.zenframework.z8.lang_ must be in the same workspace. Other Z8 dependencies are resolved with Gradle Maven plugin.

# Tasks summary

1. **Подсветка XML синтаксиса**
    - для реализации подсветки использовалась библиотека CodeMirror вместо highlight.js
    - highlight.js не умеет работать с textarea (https://stackoverflow.com/questions/19346975/highlight-js-in-textarea/27553858 
    ответ " highlight.js won't work in a textarea because its content is not part of the page and it simply can't have any styles by itself.")
    - CodeMirror заменяет textarea на <div class="CodeMirror cm-s-default"> ...
    - не совсем корректо работает сохранение/отображение, но на backend в request.json значение "xml" отправляется.
    - подсветка xml/html кода работает.
2. **YouTube проигрыватель**
    - проигрыватель реализованн в виде добавленного в dom дерево нового элемента iframe с необходимыми параметрами.
    - проигрыватель скрывается, если поле не заполнено
    - поддерживает формат ссылок вида https://www.youtube.com/watch; http://www.youtube.com/v; http://www.youtube.com/embed и т.д., но так же и http://youtu.be/
    - использовалась документация по Player Parameters и iframe API: https://developers.google.com/youtube/iframe_api_reference https://developers.google.com/youtube/player_parameters
3. **Проигрыватель аудиофайлов**
    - в задании описано использовать js/form/field/Text.js, но в таком случае пришлось бы скопировать все методы из  компонента File.js, чтбы переопределить исходные
    - для реализации компонент был унаследован от 'Z8.form.field.File' и использован стандартный html тэг <audio> в котором изменяется атрибут src
    - проигрыватель скрыт, если поле не заполнено
