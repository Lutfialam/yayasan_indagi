'use strict'

class donation {
  get rules () {
    return {
      jenis_donasi : 'required',
      berita : 'required',
      gambar : 'required|file|file_ext:png,gif,jpg,jpeg,tiff,bmp|file_size:10mb|file_types:image',
      category_id : 'required'
    }
  }

  get messages () {
    return {
      'jenis_donasi.required': 'this column is required.',
      'berita.required': 'this column is required.',
      'gambar.required': 'this column is required.',
      'gambar.file_size': 'max images size is 10MB.',
      'gambar.file_ext': 'valid extension is png,gif,jpg,jpeg,tiff,bmp.',
    }
  }
}

module.exports = donation
