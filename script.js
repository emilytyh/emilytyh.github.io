$(function () {
  // jQuery: click 後顯示／隱藏文字
  $('#toggleBtn').on('click', function () {
    $('#hiddenGoal').slideToggle(250);
    const expanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', String(!expanded));
    $(this).text(expanded ? '點我顯示學習目標' : '點我隱藏學習目標');
  });

  // Ajax: 讀取 JSON 檔案後，使用 jQuery 建立 DOM 卡片
  function loadSkills() {
    $('#loadStatus').text('讀取中…');
    $.ajax({ url: 'data.json', method: 'GET', dataType: 'json', cache: false })
      .done(function (data) {
        const $list = $('#skillList').empty();
        data.skills.forEach(function (skill) {
          const $card = $('<article>').addClass('card');
          $('<h3>').text(skill.name).appendTo($card);
          $('<p>').text(skill.description).appendTo($card);
          $list.append($card);
        });
        $('#loadStatus').text('成功讀取 ' + data.skills.length + ' 項技能（Ajax + JSON）');
      })
      .fail(function () {
        $('#skillList').empty();
        $('#loadStatus').text('讀取失敗：請透過本機伺服器或 GitHub Pages 開啟網站。');
      });
  }
  $('#reloadBtn').on('click', loadSkills);
  loadSkills();
});
