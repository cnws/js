history.replaceState && history.replaceState(
  null, '', location.pathname + location.search.replace(/[\?&](__cf_chl_jschl_tk__|__cf_chl_captcha_tk__)=[^&]+/, '').replace(/^&/, '?') + location.hash
);
document.querySelector("#CheckId").addEventListener("submit", (e) => {
e.preventDefault();
let Id = document.querySelector("#SId").value;
if (Id === "") {
document.querySelector(".sapi").innerHTML = `
<div class="alert alert-danger alert-dismissable text-center">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <strong>请输入AppId或商店链接！</strong>
</div>`;
return;
}
fetch(window.location.origin + "/CheckId", {
method: "POST",
headers: {
Accept: "application/json, text/plain, */*",
"Content-type": "application/json; charset=utf-8",
},
body: JSON.stringify({
Id,
}),
})
.then((res) => res.json())
//.then((data) => console.log(data))
.then((ret) => {
$("#SId").val('');
if (ret.Data.ErrMsg !== null) {
document.querySelector(".sapi").innerHTML = `
<div class="alert alert-danger alert-dismissable text-center">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <strong>${ret.Data.ErrMsg} </strong>
</div>`;
} else if (ret.Data.Id == 0) {
document.querySelector(".sapi").innerHTML = `
<div class="alert alert-danger alert-warning text-center">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <strong>公共库不存在：</strong> ${Id}
</div>`;
} else {
document.querySelector(".sapi").innerHTML = `
<table border="0" cellspacing="0" cellpadding="0" class="table">
    <tr class=" label-primary">
        <th scope="col" width="45%"><span style="color:white">AppId</span></th>
        <th scope="col"><span style="color:white">${ret.Data.Id}</span></th>
    </tr>
    <tr class="success">
        <td>游戏名</td>
        <td>${ret.Data.Name}</td>
    </tr>
    <tr class="active">
        <td>提交者</td>
        <td>${ret.Data.NickName}</td>
    </tr>
    <tr class="warning">
        <td>入库时间</td>
        <td>${ret.Data.Date}</td>
    </tr>
</table>
`;
}
})
.catch((err) => console.log(err));
})