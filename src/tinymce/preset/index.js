import 'tinymce/themes/silver/theme' // 引用主题文件
import 'tinymce/icons/default' // 引用图标文件
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/media'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'
import Cloud from '@/libs/Cloud'

const endpoint = import.meta.env.VITE_OSS_ENDPOINT

export default {
  classic: {
    skin_url: '/static/tinymce/skins/ui/oxide',
    content_css: '/static/tinymce/skins/content/default/content.min.css',
    language_url: '/static/tinymce/langs/zh_CN.js',
    emoticons_database_url: '/static/tinymce/plugins/emoticons/js/emojis.js',
    language: 'zh_CN',
    menubar: false,
    statusbar: false,
    toolbar_mode: 'none',
    plugins: `charmap emoticons link code table lists advlist hr image imagetools media insertdatetime wordcount
    quickbars preview fullscreen help`,
    imagetools_cors_hosts: [endpoint],
    toolbar: `undo redo |fontselect | fontsizeselect | formatselect | 
    lineheight forecolor backcolor bold italic underline strikethrough subscript superscript | removeformat | 
    alignleft aligncenter alignright alignjustify | outdent indent | 
    hr numlist bullist table charmap emoticons image media link blockquote insertdatetime |
    fullscreen code preview | wordcount help`,
    fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
    font_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
    quickbars_selection_toolbar:
      'bold italic underline strikethrough subscript superscript | formatselect | quicklink blockquote | removeformat',
    insertdatetime_formats: ['%Y年%m月%d日', '%H点%M分%S秒', '%H点%M分', '%Y-%m-%d', '%H:%M:%S', '%H:%M'],
    images_upload_handler: (blob, success, failure) => {
      const file = blob.blob()
      const cloud = new Cloud()
      cloud
        .upload(file)
        .then((res) => {
          success(res.url)
        })
        .catch((e) => {
          failure(e.message)
        })
    }
  }
}
