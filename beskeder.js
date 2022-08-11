const schoolId = document.location.href.match(/\/lectio\/(?<id>\d*)\/beskeder/).groups.id

const headers = [...document.querySelectorAll('.ShowMessage2Inner')]

headers.forEach(async header => {
  const tr = header.querySelector('tr')
  const id = tr.children[0].querySelector('span').getAttribute('data-lectiocontextcard')

  tr.innerHTML = `<td style="width:0" id="imgcell${id}">
    <img onclick="ThumbViewer.Show(event);" data-lectiocontextcard="1" alt="" src="/lectio/img/defaultfoto_small.jpg" title="Vis større foto" class="" id="ctl00_Content_ImageCtrlthumbimage">
  </td>`+tr.innerHTML

  const card = await (await fetch(`https://www.lectio.dk/lectio/${schoolId}/contextcard/contextcard.aspx?lectiocontextcard=`+id)).text()
  const img = card.match(/<img.*>/)[0]

  tr.querySelector('#imgcell'+id).innerHTML = img
})
