/**
 * Version: 1.0
 * Author: Votan
 */

var app = app || {}

const LOCATION  = window.location
const URL       = LOCATION.protocol + '//' + LOCATION.host + '/'

const TOAST_DELAY = 3000

app.selectAllTrash = async () => {
  let count
  await fetch(`${URL}api/count_trash`)
    .then((response) => response.json())
    .then((data) => count = data.count)
    .catch((err) => console.log(err))
  return count
}

app.showToast = (title, content, classname = '') => {
  let template = `
    <div id="show_toast" class="position-fixed top-0 end-0 p-3" style="z-index: 11">
      <div class="toast border-${classname}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="${TOAST_DELAY}">
        <div class="toast-header">
          <strong class="me-auto text-${classname}">${title}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${content}
        </div>
      </div>
    </div>`

  $('body').append(template)

  let toastLiveExample = $('#show_toast .toast')
  if (toastLiveExample) {
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
  }

  setTimeout(function(){
    document.getElementById('show_toast').remove()
  }, TOAST_DELAY + 500);

}

app.postEdit = () => {
  const btnEdit = $('.js-post-edit')
  if (!!btnEdit) {
    btnEdit.on('click', function(e) {
      e.preventDefault()
      const postEdited = {
        id: $('#id').val(),
        title: $('#title').val(),
        category: $('#category').val(),
        shotDes: $('#shotDes').val(),
        content: editor.getData(),
        isPublish: $('#isPublish').is(":checked") ? 0 : 1,
        updatedAt: new Date(),
        tag: $('#tag').val(),
        metaTitle: $('#metaTitle').val(),
        metaDes: $('#metaDes').val(),
      }

      fetch(`${URL}api/post/edit/`, {
          method: 'PUT',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify(postEdited)
        })
        .then((data) => {
          if(data.status === 200) {
            app.showToast(`Update Success`, `Chỉnh sửa thành công bài viết`, 'success')        
            setTimeout( function() {
              location.reload();
            }, TOAST_DELAY + 500);       
          } else alert("Lỗi Update !!!")
        })
        .catch((err) => console.log(err))
    })
  }
}

app.postDelete = () => {
  const btnDelete = $('.js-post-delete')
  if (!!btnDelete) {
    btnDelete.on('click', function(e) {
      e.preventDefault()
      const postEdited = {
        id: $('#id').val()
      }
      fetch(`${URL}api/post/delete/`, {
          method: 'PUT',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify(postEdited)
        })
        .then((data) => {
          if(data.status === 200) {
            app.showToast(`Delete Success`, `Xóa thành công bài viết`, 'danger')        
            setTimeout( function() {
              // LOCATION.href = URL+'admin/post';
              location.reload();
            }, TOAST_DELAY + 500);       
          } else alert("Lỗi Delete !!!")
        })
        .catch((err) => console.log(err))
    })
  }
}

app.postDeleteById = () => {
  const btnDelete = $('.js-post-delete-by-id')
  if (!!btnDelete) {
    btnDelete.on('click', function(e) {
      e.preventDefault()
      const _this = $(this)
      const title = _this.attr('data-title')
      if(confirm(`Bạn chắc là muốn xóa post: ${title}`)) {
        const id = _this.attr('data-id')
        fetch(`${URL}api/post/delete/`, {
            method: 'PUT',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify({id})
          })
          .then( async (data) => {
            if(data.status === 200) {

              // show toast
              app.showToast(`Delete Success`, `Xóa thành công bài viêt`, 'danger')        
              _this.closest('tr').remove()

              // Update count trash
              let count = await app.selectAllTrash() || 0
              if(!!$('#count_trash')) {
                $('#count_trash').html(count)
              }

            } else alert("Lỗi Delete !!!")
          })
          .catch((err) => console.log(err))
      }
    })
  }
}

app.postUnTrash = () => {
  const btnUnTrash = $('.js-post-untrash')
  if (!!btnUnTrash) {
    btnUnTrash.on('click', function(e) {
      e.preventDefault()
      const _this = $(this)
      const postEdited = {
        id: _this.attr('data-id') || $('#id').val()
      }
      fetch(`${URL}api/post/un-delete`, {
          method: 'PUT',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify(postEdited)
        })
        .then((data) => {
          if(data.status === 200) {
            app.showToast(`Restore Success`, `Phục hồi thành công`, 'info')        
            location.reload();   
          } else alert("Lỗi Delete !!!")
        })
        .catch((err) => console.log(err))
    })
  }
  
}

app.userUpdate = () => {
  const btnUserUpdate = $('.js-user-update')
  if (!!btnUserUpdate) {
    btnUserUpdate.on('click', function(e) {
      e.preventDefault()
      let _this = $(this)
      let frm = document.getElementById("frmUser")
      
      let formData = new FormData();

      frm.querySelectorAll('input').forEach(element => {
        formData.append(element.name, element.value)
      });

      fetch(`${URL}api/user/edit`, {
        method: 'PUT',
        //headers: { 'Content-Type':'multipart/form-data' },
        //headers: { 'Content-Type':'application/json' },
        body: formData
      })
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    })
  }
}

app.init = () => {
  app.postEdit()
  app.postDelete()
  app.postDeleteById()
  app.postUnTrash()
  app.userUpdate()
}

$(function () {
  app.init()
})
