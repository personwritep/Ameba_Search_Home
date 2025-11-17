// ==UserScript==
// @name        Ameba Search Home
// @namespace        http://tampermonkey.net/
// @version        0.1
// @description        ホーム検索の再検索を実行可能にする
// @author        Ameba Blog User
// @match        https://search.ameba.jp/*
// @exclude        https://search.ameba.jp/search/entry/*.html?aid=*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @run-at        document-start
// @grant        none
// @updateURL        https://github.com/personwritep/Ameba_Search_Home/raw/main/Ameba_Search_Home.user.js
// @downloadURL        https://github.com/personwritep/Ameba_Search_Home/raw/main/Ameba_Search_Home.user.js
// ==/UserScript==


in_view(); // ページにCSSを適用


window.addEventListener('load', function(){

    let target=document.body; // 監視 target
    let monitor=new MutationObserver(search_next);
    monitor.observe(target, {childList: true}); // 検索待受け開始

    search_next(); });



function search_next(){ // 検索結果ページごとにURLは更新される

    list_set();

    function list_set(){
        let entrylist=[];
        let entrylink=[];

        entrylist=document.querySelectorAll('.PcEntryListItem');
        for(let k=0; k<entrylist.length; k++){
            entrylink[k]=entrylist[k].querySelector('.PcEntryListItem >a');
            list_listen(k); }

        function list_listen(k){
            entrylink[k].addEventListener('click', function(event){
                event.preventDefault();
                event.stopImmediatePropagation();
                let pass=entrylink[k].getAttribute('href');
                window.open(pass, "_blank"); }, false); }

    } //  list_set()


    let search_box_react=document.querySelector('#react-autowhatever-1');
    if(search_box_react){
        search_box_react.remove(); }
    let search_button=document.querySelector('.PcSearchForm_Button');

    search_button.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        let input_box=document.querySelector('.PcSuggestForm_Input').value
        if(input_box!=''){
            let loca=location.href;
            let loca_top=loca.substring(0, (loca.lastIndexOf('/'))+1);

            let params=new URLSearchParams(location.search);
            let page=params.get("p");
            let sort=params.get("sortField");
            let query='';
            if(page){
                query='?p=1';
                if(sort){
                    query='?p=1&sortField='+sort; }}
            else{
                if(sort){
                    query='?sortField='+sort; }}

            location.href=loca_top + input_box +'.html'+ query; }

    }, false);

} // search_next



function in_view(){
    let style=
        '<style class="sty0">'+
        '.PcNavigationSearch { position: relative; }'+
        '.AmebaLogo { width: 100px; }'+
        '.PcNavigationSearch_Logo > img { width: 36px; }'+
        '.PcSearchForm_Button { width: 80px; }'+
        '#asr_help { position: absolute; top: 12px; left: -35px; '+
        'font: bold 16px/21px Meiryo; height: 17px; padding: 1px 2px 2px 3px; '+
        'color: #fff; border-radius: 30px; background: #666; cursor: pointer; }'+
        '#back_blog { font-size: 32px; line-height: 26px; height: 26px; padding: 4px; '+
        'margin-left: 20px; cursor: pointer; border: 1px solid #fff; border-radius: 6px; '+
        'color: #fff; background: #2196f3; }'+
        '#sw_tooltip { position: relative; left: -165px; white-space: nowrap; '+
        'font-size: 14px; padding: 4px 10px 0; border: 1px solid #ccc; background: #fff; '+
        'box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.5); display: none; }'+
        '#back_blog:hover + #sw_tooltip { display: block; }'+
        '.PcEntryList_Caption { padding: 5px 10px 2px !important; '+
        'margin: 0 10px 6px 0 !important; }'+
        '.PcResultPagination { position: relative; padding: 0 0 4px 140px !important; }'+
        '.PcEntryListItem_Link { position: relative; height: 75px; }'+
        '</style>';

    if(!document.querySelector('.sty0')){
        document.documentElement.insertAdjacentHTML('beforeend', style); }}
