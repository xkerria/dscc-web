import tinymce from 'tinymce'

tinymce.PluginManager.add('test', function (editor, url) {
  const test = () => {
    editor.insertContent('<p>Hello, TinyMCE!</p>')
  }

  editor.ui.registry.addMenuItem('test', {
    text: 'test',
    onAction: function () {
      test()
    }
  })

  editor.ui.registry.addButton('test', {
    text: 'test',
    onAction: function () {
      test()
    }
  })
})
