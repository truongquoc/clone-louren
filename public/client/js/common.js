//
// // 상품항목 컨트롤
// $J(document).ready(function($) {
//     // 다국어일 경우 다시 처리
//     $(".xans-product-detaildesign table tr th span:contains('상품간략설명')", this).parent().parent().remove();
// });
//
//
// // 상단 고정일 경우 # 해쉬태그 처리 (상품상세 페이지)
// $J(document).ready(function($) {
//     if ($('.custom_detail_tabs').length) {
//         $('.custom_detail_tabs ul.menu a[href*="#"]').on('click', function(e) {
//             if ($(this).attr('href') != '#') {
//                 e.preventDefault();
//                 // 상단에 패딩줄 픽셀
//                 var padding_top = 120;
//                 // padding_top = $('#header .header_area').height();
//                 $('html, body').animate({'scrollTop': $(this.hash).offset().top - padding_top}, 500);
//             }
//         });
//     }
// });
//
//
// // 상품상세 빠른구매
// $J(document).ready(function($) {
//
//     var _bottom = 0;
//     var _dummy_bottom = $('.infoArea').height() * -1;
//     var _offset_padding = 600;
//
//     if ($('.infoArea').length && !$('.no_info_fixed').length) {
//
//         $('.infoArea').wrap('<div class="infoArea_wrap"></div>');
//         $('.infoArea_wrap').wrap('<div class="infoArea_all_wrap"></div>');
//         $('.infoArea').wrapInner('<div class="infoArea_inner"></div>');
//         $('.infoArea').prepend('<div class="info_close_bt"><a href="#">&nbsp; <i class="fa fa-chevron-down" aria-hidden="true"></i></a></div>');
//         $('body').append('<div class="fixed_buy_button"><a href="#" class="buy_bt">옵션 바로선택 <i class="fa fa-chevron-up" aria-hidden="true"></i></a></div>');
//
//         var _offset = $('.infoArea_wrap').offset();
//         $(window).scroll(function() {
//             if ($(this).scrollTop() > (_offset.top + $('.infoArea_all_wrap').height())) {
//                 $('.infoArea_all_wrap').css('height', $('.infoArea_all_wrap').height() + 'px');
//                 $('.infoArea_wrap').addClass('fixed');
//
//                 var content_offset = $('#container #contents').offset();
//                 var info_fixed_left = Math.round(content_offset.left + $('#container #contents .fixed_row').width()) - $('.infoArea_wrap.fixed').width();
//                 var button_fixed_left = Math.round(content_offset.left + $('#container #contents .fixed_row').width()) - $('.fixed_buy_button').width();
//
//                 if ($('.fixed_buy_button').hasClass('checked')) {
//                     $('.infoArea_wrap').css('bottom', _bottom + 'px');
//                     $('.fixed_buy_button').css('display', 'none');
//
//                 } else {
//                     $('.infoArea_wrap').css('bottom', _dummy_bottom + 'px');
//                     $('.fixed_buy_button').css('display', 'block');
//
//                 }
//
//             }
//             else {
//                 $('.infoArea_all_wrap').css('height', 'auto');
//                 $('.infoArea_wrap').removeClass('fixed');
//                 _dummy_bottom = $('.infoArea').height() * -1;
//                 $('.infoArea_wrap').css('bottom', _dummy_bottom + 'px');
//
//                 $('.fixed_buy_button').removeClass('checked');
//                 $('.fixed_buy_button').css('display', 'none');
//             }
//         });
//
//         // 최초 한번은 동작되도록 한다.
//         $(window).scroll();
//     }
//
//     // 닫기 버튼
//     $('.info_close_bt').click(function() {
//         $('.fixed_buy_button').removeClass('checked');
//         $('.infoArea_wrap').stop().animate({'bottom': _dummy_bottom + 'px'}, 800, function() { $('.fixed_buy_button').css('display', 'block'); });
//         return false;
//     });
//
//     // 구매 버튼
//     $('.fixed_buy_button a.buy_bt').click(function() {
//         $('.fixed_buy_button').addClass('checked');
//         $('.fixed_buy_button').css('display', 'none');
//
//         $('.infoArea_wrap').stop().animate({'bottom': _bottom + 'px'}, 800);
//         return false;
//     });
//
// });
//
//
// /**
//  * 상품상세 섬네일 롤링
//  */
// $(document).ready(function(){
//     $.fn.prdImg = function(parm){
//         var index = 0;
//         var target = parm.target;
//         var view = parm.view;
//         var listWrap = target.find('.xans-product-addimage');
//         var limit = listWrap.find('> ul > li').length;
//         var ul = target.find('.xans-product-addimage > ul');
//         var liFirst = target.find('.xans-product-addimage > ul > li:first-child');
//         var liWidth = parseInt(liFirst.width());
//         var liHeight = parseInt(liFirst.height());
//         var blockWidth = liWidth + parseInt(liFirst.css('marginRight')) + parseInt(liFirst.css('marginLeft'));
//         var columWidth = blockWidth * view;
//         var colum = Math.ceil(limit / view);
//
//         var roll = {
//             init : function(){
//                 function struct(){
//                     var ulWidth = limit * parseInt(blockWidth);
//                     listWrap.append('<button type="button" class="prev">이전</button>');
//                     listWrap.append('<button type="button" class="next">다음</button>');
//                     ul.css({'position':'absolute', 'left':0, 'top':0, 'width':ulWidth});
//                     listWrap.find('> ul > li').each(function(){
//                         $(this).css({'float':'left'});
//                     });
//                     listWrap.css({'position':'relative', 'height':liHeight});
//
//                     var prev = listWrap.find('.prev');
//                     var next = listWrap.find('.next');
//
//                     prev.click(function(){
//                         if(index > 0){
//                             index --;
//                         }
//                         roll.slide(index);
//                     });
//                     next.click(function(){
//                         if(index < (colum-1) ){
//                             index ++;
//                         }
//                         roll.slide(index);
//                     });
//                     if(index == 0){
//                         prev.hide();
//                     } else {
//                         prev.show();
//                     }
//                     if(index >= (colum-1)){
//                         next.hide();
//                     } else {
//                         next.show();
//                     }
//                 }
//                 if(limit > view){
//                     struct();
//                 }
//             },
//             slide : function(index){
//                 var left = '-' + (index * columWidth) +'px';
//                 var prev = listWrap.find('.prev');
//                 var next = listWrap.find('.next');
//                 if(index == 0){
//                     prev.hide();
//                 } else {
//                     prev.show();
//                 }
//                 if(index >= (colum-1)){
//                     next.hide();
//                 } else {
//                     next.show();
//                 }
//                 ul.stop().animate({'left':left},500);
//             }
//         }
//         roll.init();
//     };
//
//     // 함수호출 : 상품상세 페이지
//     $.fn.prdImg({
//         target : $('.xans-product-image'),
//         view : 5
//     });
//
//     // 함수호출 : 상품확대보기팝업
//     $.fn.prdImg({
//         target : $('.xans-product-zoom'),
//         view : 5
//     });
//
// });
// /**
//  * 상품상세 사용후기
//  */
// $(document).ready(function(){
//     $('.xans-product-review a').click(function(e) {
//         e.preventDefault();
//
//         var no = $(this).attr('href').replace(/(\S*)[?&]no=(\d+)(\S*)/g, '$2');
//         var $obj = $('#product-review-read_'+no);
//
//         //로드된 엘리먼트 존재 체크
//         if ($obj.length > 0) {
//             if ($obj.css('display') =='none') {
//                 $obj.show();
//             } else {
//                 $obj.hide();
//             }
//             return;
//         }
//
//         REVIEW.getReadData($(this));
//     });
// });
//
// var PARENT = '';
//
// var OPEN_REVIEW = '';
//
// var REVIEW = {
//     getReadData : function(obj, eType)
//     {
//         if (obj != undefined) {
//             PARENT = obj;
//             var sHref = obj.attr('href');
//             var pNode = obj.parents('tr');
//             var pass_check = '&pass_check=F';
//         } else {
//             var sHref = PARENT.attr('href');
//             var pNode = PARENT.parents('tr');
//             var pass_check = '&pass_check=T';
//         }
//
//         var sQuery = sHref.split('?');
//
//         var sQueryNo = sQuery[1].split('=');
//         if (OPEN_REVIEW == sQueryNo[1]) {
//             $('#product-review-read').remove();
//             OPEN_REVIEW = '';
//             return false;
//         } else {
//             OPEN_REVIEW = sQueryNo[1];
//         }
//
//         $.ajax({
//             url : '/exec/front/board/product/4?'+sQuery[1]+pass_check,
//             dataType: 'json',
//             success: function(data) {
//                 $('#product-review-read').remove();
//
//                 var sPath = document.location.pathname;
//                 var sPattern = /^\/product\/(.+)\/([0-9]+)(\/.*)/;
//                 var aMatchResult = sPath.match(sPattern);
//
//                 if (aMatchResult) {
//                     var iProductNo = aMatchResult[2];
//                 } else {
//                     var iProductNo = getQueryString('product_no');
//                 }
//
//                 var aHtml = [];
//
//                 //읽기 권한 체크
//                 if (false === data.read_auth && eType == undefined) {
//                     alert(decodeURIComponent(data.alertMSG));
//
//                     //로그인페이지 이동
//                     if (data.returnUrl != undefined) {
//                         location.replace("/member/login.html?returnUrl=" + data.returnUrl);
//                     }
//                     return false;
//                 }
//
//                 if (data.is_secret == true) {
//                     // 비밀글 비밀번호 입력 폼
//                     aHtml.push('<form name="SecretForm_4" id="SecretForm_4">');
//                     aHtml.push('<input type="text" name="a" style="display:none;">');
//                     aHtml.push('<div class="view"><p>비밀번호 <input type="password" id="secure_password" name="secure_password" onkeydown="if (event.keyCode == 13) '+data.action_pass_submit+'"> <input type="button" value="확인" onclick="'+data.action_pass_submit+'"></p></div>');
//                     aHtml.push('</form>');
//                 } else {
//                     // 글 내용
//                     if (data.read['content_image'] != null) {
//                         var sImg = data.read['content_image'];
//                     } else {
//                         var sImg = '';
//                     }
//
//                     aHtml.push('<div class="view">');
//                     aHtml.push('<p>'+data.read['content']+'</p>');
//                     aHtml.push('<p>'+sImg+'</p>');
//                     aHtml.push('<p class="ec-base-button"><span class="gLeft">');
//                     if (data.write_auth == true) {
//                         aHtml.push('<a href="/board/product/modify.html?board_act=edit&no='+data.no+'&board_no=4&link_product_no='+iProductNo+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_board_modify.gif" alt="게시글 수정하기" /></a>');
//                     }
//                     aHtml.push('</span></p>');
//                     aHtml.push('</div>');
//
//                     // 댓글리스트
//                     if (data.comment != undefined && data.comment.length != undefined) {
//                         aHtml.push('<ul class="boardComment">');
//                         for (var i=0; data.comment.length > i; i++) {
//                             //댓글리스트
//                             if (data.comment[i]['comment_reply_css'] == undefined) {
//                                 aHtml.push('<li>');
//                                 aHtml.push('<strong class="name">'+data.comment[i]['member_icon']+' '+data.comment[i]['comment_name']+'</strong>');
//                                 aHtml.push('<span class="date">'+data.comment[i]['comment_write_date']+'</span>');
//                                 aHtml.push('<span class="grade '+data.use_point+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/ico_point'+data.comment[i]['comment_point_count']+'.gif" alt="'+data.comment[i]['comment_point_count']+'점" /></span>');
//                                 if (data.comment[i]['comment_reply_display'] == true) {
//                                     aHtml.push('<span class="button">'+'<a href="#none" onclick="'+data.comment[i]['action_comment_reply']+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/btn_ico_reply.gif" alt="댓글" /></a>'+'</span>');
//                                 }
//                                 aHtml.push('<p class="comment">'+data.comment[i]['comment_icon_lock']+' '+data.comment[i]['comment_content']+'</p>');
//                                 aHtml.push('</li>');
//                             } else {
//                                 //댓글의 댓글리스트
//                                 aHtml.push('<li class="replyArea">');
//                                 aHtml.push('<strong class="name">'+data.comment[i]['member_icon']+' '+data.comment[i]['comment_name']+'</strong>');
//                                 aHtml.push('<span class="date">'+data.comment[i]['comment_write_date']+'</span>');
//                                 aHtml.push('<p class="comment">'+data.comment[i]['comment_icon_lock']+' '+data.comment[i]['comment_content']+'</p>');
//                                 aHtml.push('</li>');
//                             }
//                         }
//                         aHtml.push('</ul>');
//                     }
//
//                     // 댓글쓰기
//                     if (data.comment_write != undefined) {
//                         aHtml.push('<form name="commentWriteForm_4'+data.key+'" id="commentWriteForm_4'+data.key+'">');
//                         aHtml.push('<div class="memoCont">');
//                         aHtml.push('<div class="writer">');
//                         aHtml.push('<div class="user"><div class="nameArea">이름 '+data.comment_write['comment_name']+' 비밀번호 '+data.comment_write['comment_password']);
//                         if (data.comment_write['comment_secret_display'] == true) {
//                             aHtml.push('<label class="secret">'+data.comment_write['secure']+' 비밀댓글</label>');
//                         }
//                         aHtml.push('<p class="ec-base-help '+data.comment_write['password_rule_help_display_class']+'">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>');
//                         aHtml.push('</div>');
//                         aHtml.push(''+data.comment_write['comment']+'<a href="#none" onclick="'+data.comment_write['action_comment_insert']+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/btn_comment_submit.gif" alt="확인" /></a></div>');
//                         aHtml.push('<p class="rating '+data.comment_write['use_point']+'">'+data.comment_write['comment_point']+'</p>');
//                         aHtml.push('<p class="text '+data.comment_write['use_comment_size']+'">'+data.comment_write['comment_byte']+' / '+data.comment_write['comment_size']+' byte</p>');
//                         aHtml.push('<p class="captcha '+data.comment_write['use_captcha']+'">'+data.comment_write['captcha_image']+data.comment_write['captcha_refresh']+data.comment_write['captcha']+'<img src="//img.echosting.cafe24.com/skin/base/common/ico_info.gif" alt="" /> 왼쪽의 문자를 공백없이 입력하세요.(대소문자구분)</p>');
//                         aHtml.push('</div>');
//                         aHtml.push('</div>');
//                         aHtml.push('</form>');
//                     }
//
//                     // 댓글의 댓글쓰기
//                     if (data.comment_reply != undefined) {
//                         aHtml.push('<form name="commentReplyWriteForm_4'+data.key+'" id="commentReplyWriteForm_4'+data.key+'" style="display:none">');
//                         aHtml.push('<div class="memoCont reply">');
//                         aHtml.push('<div class="writer">');
//                         aHtml.push('<div class="user"><div class="nameArea">이름 '+data.comment_reply['comment_name']+' 비밀번호 '+data.comment_reply['comment_password']);
//                         if (data.comment_reply['comment_secret_display'] == true) {
//                             aHtml.push('<label class="secret">'+data.comment_reply['secure']+' 비밀댓글</label>');
//                         }
//                         aHtml.push('<p class="ec-base-help '+data.comment_write['password_rule_help_display_class']+'">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>');
//                         aHtml.push('</div>');
//                         aHtml.push(''+data.comment_reply['comment']+'<a href="#none" onclick="'+data.comment_reply['action_comment_insert']+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/btn_comment_submit.gif" alt="확인" /></a></div>');
//                         aHtml.push('<p class="text '+data.comment_reply['use_comment_size']+'">'+data.comment_reply['comment_byte']+' / '+data.comment_reply['comment_size']+' byte</p>');
//                         aHtml.push('<p class="captcha '+data.comment_reply['use_captcha']+'">'+data.comment_reply['captcha_image']+data.comment_write['captcha_refresh']+data.comment_reply['captcha']+'<img src="//img.echosting.cafe24.com/skin/base/common/ico_info.gif" alt="" /> 왼쪽의 문자를 공백없이 입력하세요.(대소문자구분)</p>');
//                         aHtml.push('</div>');
//                         aHtml.push('</div>');
//                         aHtml.push('</form>');
//                     }
//                     // 비밀댓글 확인
//                     if (data.comment_secret != undefined) {
//                         aHtml.push('<form name="commentSecretForm_4'+data.key+'" id="commentSecretForm_4'+data.key+'" style="display:none">');
//                         aHtml.push('<div class="commentSecret">');
//                         aHtml.push('<p>비밀번호 : '+data.comment_secret['secure_password']);
//                         aHtml.push(' <a href="#none" onclick="'+data.comment_secret['action_secret_submit']+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/btn_ico_submit.gif" alt="확인" /></a>');
//                         aHtml.push(' <a href="#none" onclick="'+data.comment_secret['action_secret_cancel']+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/btn_ico_cancel.gif" alt="취소" /></a></p>');
//                         aHtml.push('</div>');
//                         aHtml.push('</form>');
//                     }
//                 }
//
//                 $(pNode).after('<tr id="product-review-read'+data.key+'"><td colspan="6">'+aHtml.join('')+'</td></tr>');
//
//                 // 평점기능 사용안함일 경우 보여지는 td를 조절하기 위한 함수
//                 PRODUCT_COMMENT.comment_colspan(pNode);
//
//                 if (data.comment_write != undefined && data.comment_write['use_comment_size'] == '') PRODUCT_COMMENT.comment_byte(4, data.key);
//                 if (data.comment_reply != undefined && data.comment_write['use_comment_size'] == '') PRODUCT_COMMENT.comment_byte(4, data.key, 'commentReplyWriteForm');
//             }
//         });
//     },
//
//     END : function() {}
// };
// /**
//  * 상품상세 Q&A
//  */
// $(document).ready(function(){
//     $('.xans-product-qna a').click(function(e) {
//         e.preventDefault();
//
//         var no = $(this).attr('href').replace(/(\S*)[?&]no=(\d+)(\S*)/g, '$2');
//         var $obj = $('#product-qna-read_'+no);
//
//         //로드된 엘리먼트 존재 체크
//         if ($obj.length > 0) {
//             if ($obj.css('display') =='none') {
//                 $obj.show();
//             } else {
//                 $obj.hide();
//             }
//             return;
//         }
//
//         QNA.getReadData($(this));
//
//     });
// });
//
// var PARENT = '';
//
// var OPEN_QNA = '';
//
// var QNA = {
//     getReadData : function(obj, eType)
//     {
//         if (obj != undefined) {
//             PARENT = obj;
//             var sHref = obj.attr('href');
//             var pNode = obj.parents('tr');
//             var pass_check = '&pass_check=F';
//         } else {
//             var sHref = PARENT.attr('href');
//             var pNode = PARENT.parents('tr');
//             var pass_check = '&pass_check=T';
//         }
//
//         var sQuery = sHref.split('?');
//
//         var sQueryNo = sQuery[1].split('=');
//         if (OPEN_QNA == sQueryNo[1]) {
//             $('#product-qna-read').remove();
//             OPEN_QNA = '';
//             return false;
//         } else {
//             OPEN_QNA = sQueryNo[1];
//         }
//
//         $.ajax({
//             url : '/exec/front/board/product/6?'+sQuery[1]+pass_check,
//             dataType: 'json',
//             success: function(data) {
//                 $('#product-qna-read').remove();
//
//                 var sPath = document.location.pathname;
//                 var sPattern = /^\/product\/(.+)\/([0-9]+)(\/.*)/;
//                 var aMatchResult = sPath.match(sPattern);
//
//                 if (aMatchResult) {
//                     var iProductNo = aMatchResult[2];
//                 } else {
//                     var iProductNo = getQueryString('product_no');
//                 }
//
//                 var aHtml = [];
//
//                 //읽기 권한 체크
//                 if (false === data.read_auth && eType == undefined) {
//                     alert(decodeURIComponent(data.alertMSG));
//
//                     //로그인페이지 이동
//                     if (data.returnUrl != undefined) {
//                         location.replace("/member/login.html?returnUrl=" + data.returnUrl);
//                     }
//                     return false;
//                 }
//
//                 if (data.is_secret == true) {
//                     // 비밀글 비밀번호 입력 폼
//                     aHtml.push('<form name="SecretForm_6" id="SecretForm_6">');
//                     aHtml.push('<input type="text" name="a" style="display:none;">');
//                     aHtml.push('<div class="view"><p>비밀번호 <input type="password" id="secure_password" name="secure_password" onkeydown="if (event.keyCode == 13) '+data.action_pass_submit+'"> <input type="button" value="확인" onclick="'+data.action_pass_submit+'"></p></div>');
//                     aHtml.push('</form>');
//                 } else {
//                     // 글 내용
//                     if (data.read['content_image'] != null) {
//                         var sImg = data.read['content_image'];
//                     } else {
//                         var sImg = '';
//                     }
//
//                     aHtml.push('<div class="view">');
//                     aHtml.push('<p>'+data.read['content']+'</p>');
//                     aHtml.push('<p>'+sImg+'</p>');
//                     aHtml.push('<p class="ec-base-button"><span class="gLeft">');
//                     if (data.write_auth == true) {
//                         aHtml.push('<a href="/board/product/modify.html?board_act=edit&no='+data.no+'&board_no=6&link_product_no='+iProductNo+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/product/btn_board_modify.gif" alt="게시글 수정하기" /></a>');
//                     }
//                     aHtml.push('</span></p>');
//                     aHtml.push('</div>');
//
//                     // 댓글리스트
//                     if (data.comment != undefined && data.comment.length != undefined) {
//                         aHtml.push('<ul class="boardComment">');
//                         for (var i=0; data.comment.length > i; i++) {
//                             //댓글리스트
//                             if (data.comment[i]['comment_reply_css'] == undefined) {
//                                 aHtml.push('<li>');
//                                 aHtml.push('<strong class="name">'+data.comment[i]['member_icon']+' '+data.comment[i]['comment_name']+'</strong>');
//                                 aHtml.push('<span class="date">'+data.comment[i]['comment_write_date']+'</span>');
//                                 aHtml.push('<span class="grade '+data.use_point+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/ico_point'+data.comment[i]['comment_point_count']+'.gif" alt="'+data.comment[i]['comment_point_count']+'점" /></span>');
//                                 if (data.comment[i]['comment_reply_display'] == true) {
//                                     aHtml.push('<span class="button">'+'<a href="#none" onclick="'+data.comment[i]['action_comment_reply']+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/btn_ico_reply.gif" alt="댓글" /></a>'+'</span>');
//                                 }
//                                 aHtml.push('<p class="comment">'+data.comment[i]['comment_icon_lock']+' '+data.comment[i]['comment_content']+'</p>');
//                                 aHtml.push('</li>');
//                             } else {
//                                 //댓글의 댓글리스트
//                                 aHtml.push('<li class="replyArea">');
//                                 aHtml.push('<strong class="name">'+data.comment[i]['member_icon']+' '+data.comment[i]['comment_name']+'</strong>');
//                                 aHtml.push('<span class="date">'+data.comment[i]['comment_write_date']+'</span>');
//                                 aHtml.push('<p class="comment">'+data.comment[i]['comment_icon_lock']+' '+data.comment[i]['comment_content']+'</p>');
//                                 aHtml.push('</li>');
//                             }
//                         }
//                         aHtml.push('</ul>');
//                     }
//
//                     // 댓글쓰기
//                     if (data.comment_write != undefined) {
//                         aHtml.push('<form name="commentWriteForm_6'+data.key+'" id="commentWriteForm_6'+data.key+'">');
//                         aHtml.push('<div class="memoCont">');
//                         aHtml.push('<div class="writer">');
//                         aHtml.push('<div class="user"><div class="nameArea">이름 '+data.comment_write['comment_name']+' 비밀번호 '+data.comment_write['comment_password']);
//                         if (data.comment_write['comment_secret_display'] == true) {
//                             aHtml.push('<label class="secret">'+data.comment_write['secure']+' 비밀댓글</label>');
//                         }
//                         aHtml.push('<p class="ec-base-help '+data.comment_write['password_rule_help_display_class']+'">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>');
//                         aHtml.push('</div>');
//                         aHtml.push(''+data.comment_write['comment']+'<a href="#none" onclick="'+data.comment_write['action_comment_insert']+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/btn_comment_submit.gif" alt="확인" /></a></div>');
//                         aHtml.push('<p class="rating '+data.comment_write['use_point']+'">'+data.comment_write['comment_point']+'</p>');
//                         aHtml.push('<p class="text '+data.comment_write['use_comment_size']+'">'+data.comment_write['comment_byte']+' / '+data.comment_write['comment_size']+' byte</p>');
//                         aHtml.push('<p class="captcha '+data.comment_write['use_captcha']+'">'+data.comment_write['captcha_image']+data.comment_write['captcha_refresh']+data.comment_write['captcha']+'<img src="//img.echosting.cafe24.com/skin/base/common/ico_info.gif" alt="" /> 왼쪽의 문자를 공백없이 입력하세요.(대소문자구분)</p>');
//                         aHtml.push('</div>');
//                         aHtml.push('</div>');
//                         aHtml.push('</form>');
//                     }
//
//                     // 댓글의 댓글쓰기
//                     if (data.comment_reply != undefined) {
//                         aHtml.push('<form name="commentReplyWriteForm_6'+data.key+'" id="commentReplyWriteForm_6'+data.key+'" style="display:none">');
//                         aHtml.push('<div class="memoCont reply">');
//                         aHtml.push('<div class="writer">');
//                         aHtml.push('<div class="user"><div class="nameArea">이름 '+data.comment_reply['comment_name']+' 비밀번호 '+data.comment_reply['comment_password']);
//                         if (data.comment_reply['comment_secret_display'] == true) {
//                             aHtml.push('<label class="secret">'+data.comment_reply['secure']+' 비밀댓글</label>');
//                         }
//                         aHtml.push('<p class="ec-base-help '+data.comment_write['password_rule_help_display_class']+'">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>');
//                         aHtml.push('</div>');
//                         aHtml.push(''+data.comment_reply['comment']+'<a href="#none" onclick="'+data.comment_reply['action_comment_insert']+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/btn_comment_submit.gif" alt="확인" /></a></div>');
//                         aHtml.push('<p class="text '+data.comment_reply['use_comment_size']+'">'+data.comment_reply['comment_byte']+' / '+data.comment_reply['comment_size']+' byte</p>');
//                         aHtml.push('<p class="captcha '+data.comment_reply['use_captcha']+'">'+data.comment_reply['captcha_image']+data.comment_reply['captcha_refresh']+data.comment_reply['captcha']+'<img src="//img.echosting.cafe24.com/skin/base/common/ico_info.gif" alt="" /> 왼쪽의 문자를 공백없이 입력하세요.(대소문자구분)</p>');
//                         aHtml.push('</div>');
//                         aHtml.push('</div>');
//                         aHtml.push('</form>');
//                     }
//                     // 비밀댓글 확인
//                     if (data.comment_secret != undefined) {
//                         aHtml.push('<form name="commentSecretForm_6'+data.key+'" id="commentSecretForm_6'+data.key+'" style="display:none">');
//                         aHtml.push('<div class="commentSecret">');
//                         aHtml.push('<p>비밀번호 : '+data.comment_secret['secure_password']);
//                         aHtml.push(' <a href="#none" onclick="'+data.comment_secret['action_secret_submit']+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/btn_ico_submit.gif" alt="확인" /></a>');
//                         aHtml.push(' <a href="#none" onclick="'+data.comment_secret['action_secret_cancel']+'"><img src="//img.echosting.cafe24.com/skin/base_ko_KR/board/btn_ico_cancel.gif" alt="취소" /></a></p>');
//                         aHtml.push('</div>');
//                         aHtml.push('</form>');
//                     }
//                 }
//
//                 $(pNode).after('<tr id="product-qna-read'+data.key+'"><td colspan="6">'+aHtml.join('')+'</td></tr>');
//
//                 // 평점기능 사용안함일 경우 보여지는 td를 조절하기 위한 함수
//                 PRODUCT_COMMENT.comment_colspan(pNode);
//
//                 if (data.comment_write != undefined && data.comment_write['use_comment_size'] == '') PRODUCT_COMMENT.comment_byte(6, data.key);
//                 if (data.comment_reply != undefined && data.comment_write['use_comment_size'] == '') PRODUCT_COMMENT.comment_byte(6, data.key, 'commentReplyWriteForm');
//             }
//         });
//     },
//
//     END : function() {}
// };
// /**
//  * 움직이는 배너 Jquery Plug-in
//  * @author  cafe24
//  */
//
// (function($){
//
//     $.fn.floatBanner = function(options) {
//         options = $.extend({}, $.fn.floatBanner.defaults , options);
//
//         return this.each(function() {
//             var aPosition = $(this).position();
//             var jbOffset = $(this).offset();
//             var node = this;
//
//             $(window).scroll(function() {
//                 var _top = $(document).scrollTop();
//                 _top = (aPosition.top < _top) ? _top : aPosition.top;
//
//                 setTimeout(function () {
//                     var newinit = $(document).scrollTop();
//
//                     if ( newinit > jbOffset.top ) {
//                         _top -= jbOffset.top;
//                         var container_height = $("#wrap").height();
//                         var quick_height = $(node).height();
//                         var cul = container_height - quick_height;
//                         if(_top > cul){
//                             _top = cul;
//                         }
//                     }else {
//                         _top = 0;
//                     }
//
//                     $(node).stop().animate({top: _top}, options.animate);
//                 }, options.delay);
//             });
//         });
//     };
//
//     $.fn.floatBanner.defaults = {
//         'animate'  : 500,
//         'delay'    : 500
//     };
//
// })(jQuery);
//
// /**
//  * 문서 구동후 시작
//  */
// $(document).ready(function(){
//     $('#banner:visible, #quick:visible').floatBanner();
//
//     //placeholder
//     $(".ePlaceholder input, .ePlaceholder textarea").each(function(i){
//         var placeholderName = $(this).parents().attr('title');
//         $(this).attr("placeholder", placeholderName);
//     });
//     /* placeholder ie8, ie9 */
//     $.fn.extend({
//         placeholder : function() {
//             //IE 8 버전에는 hasPlaceholderSupport() 값이 false를 리턴
//             if (hasPlaceholderSupport() === true) {
//                 return this;
//             }
//             //hasPlaceholderSupport() 값이 false 일 경우 아래 코드를 실행
//             return this.each(function(){
//                 var findThis = $(this);
//                 var sPlaceholder = findThis.attr('placeholder');
//                 if ( ! sPlaceholder) {
//                     return;
//                 }
//                 findThis.wrap('<label class="ePlaceholder" />');
//                 var sDisplayPlaceHolder = $(this).val() ? ' style="display:none;"' : '';
//                 findThis.before('<span' + sDisplayPlaceHolder + '>' + sPlaceholder + '</span>');
//                 this.onpropertychange = function(e){
//                     e = event || e;
//                     if (e.propertyName == 'value') {
//                         $(this).trigger('focusout');
//                     }
//                 };
//                 //공통 class
//                 var agent = navigator.userAgent.toLowerCase();
//                 if (agent.indexOf("msie") != -1) {
//                     $(".ePlaceholder").css({"position":"relative"});
//                     $(".ePlaceholder span").css({"position":"absolute", "padding":"0 4px", "color":"#878787"});
//                     $(".ePlaceholder label").css({"padding":"0"});
//                 }
//             });
//         }
//     });
//
//     $(':input[placeholder]').placeholder(); //placeholder() 함수를 호출
//
//     //클릭하면 placeholder 숨김
//     $('body').delegate('.ePlaceholder span', 'click', function(){
//         $(this).hide();
//     });
//
//     //input창 포커스 인 일때 placeholder 숨김
//     $('body').delegate('.ePlaceholder :input', 'focusin', function(){
//         $(this).prev('span').hide();
//     });
//
//     //input창 포커스 아웃 일때 value 가 true 이면 숨김, false 이면 보여짐
//     $('body').delegate('.ePlaceholder :input', 'focusout', function(){
//         if (this.value) {
//             $(this).prev('span').hide();
//         } else {
//             $(this).prev('span').show();
//         }
//     });
//
//     //input에 placeholder가 지원이 되면 true를 안되면 false를 리턴값으로 던져줌
//     function hasPlaceholderSupport() {
//         if ('placeholder' in document.createElement('input')) {
//             return true;
//         } else {
//             return false;
//         }
//     }
// });
//
// /**
//  *  썸네일 이미지 엑박일경우 기본값 설정
//  */
// $(window).load(function() {
//     $("img.thumb,img.ThumbImage,img.BigImage").each(function($i,$item){
//         var $img = new Image();
//         $img.onerror = function () {
//             $item.src="//img.echosting.cafe24.com/thumb/img_product_big.gif";
//         }
//         $img.src = this.src;
//     });
// });
// //window popup script
// function winPop(url) {
//     window.open(url, "popup", "width=300,height=300,left=10,top=10,resizable=no,scrollbars=no");
// }
// /**
//  * document.location.href split
//  * return array Param
//  */
//
//
// $(document).ready(function(){
//     // tab
//     $.eTab = function(ul){
//         $(ul).find('a').click(function(){
//             var _li = $(this).parent('li').addClass('selected').siblings().removeClass('selected'),
//                 _target = $(this).attr('href'),
//                 _siblings = '.' + $(_target).attr('class');
//             $(_target).show().siblings(_siblings).hide();
//             return false
//         });
//     }
//     if ( window.call_eTab ) {
//         call_eTab();
//     };
// });
// (function($){
//     $.fn.extend({
//         center: function() {
//             this.each(function() {
//                 var
//                     $this = $(this),
//                     $w = $(window);
//                 $this.css({
//                     position: "absolute",
//                     top: ~~(($w.height() - $this.outerHeight()) / 2) + $w.scrollTop() + "px",
//                     left: ~~(($w.width() - $this.outerWidth()) / 2) + $w.scrollLeft() + "px"
//                 });
//             });
//             return this;
//         }
//     });
//     $(function() {
//         var $container = function(){/*
// <div id="modalContainer">
//     <iframe id="modalContent" scroll="0" scrolling="no" frameBorder="0"></iframe>
// </div>');
// */}.toString().slice(14,-3);
//         $('body')
//             .append($('<div id="modalBackpanel"></div>'))
//             .append($($container));
//         function closeModal () {
//             $('#modalContainer').hide();
//             $('#modalBackpanel').hide();
//         }
//         $('#modalBackpanel').click(closeModal);
//         zoom = function ($piProductNo, $piCategoryNo, $piDisplayGroup) {
//             var $url = '/product/image_zoom.html?product_no=' + $piProductNo + '&cate_no=' + $piCategoryNo + '&display_group=' + $piDisplayGroup;
//             $('#modalContent').attr('src', $url);
//             $('#modalContent').bind("load",function(){
//                 $(".header .close",this.contentWindow.document.body).bind("click", closeModal);
//             });
//             $('#modalBackpanel').css({width:$("body").width(),height:$("body").height(),opacity:.4}).show();
//             $('#modalContainer').center().show();
//         }
//     });
// })(jQuery);
//
// /*!
//  * $J Cookie Plugin v1.4.1
//  * https://github.com/carhartl/jquery-cookie
//  *
//  * Copyright 2006, 2014 Klaus Hartl
//  * Released under the MIT license
//  */
// (function (factory) {
//     if (typeof define === 'function' && define.amd) {
//         // AMD (Register as an anonymous module)
//         define(['jquery'], factory);
//     } else if (typeof exports === 'object') {
//         // Node/CommonJS
//         module.exports = factory(require('jquery'));
//     } else {
//         // Browser globals
//         factory($J);
//     }
// }(function ($) {
//
//     var pluses = /\+/g;
//
//     function encode(s) {
//         return config.raw ? s : encodeURIComponent(s);
//     }
//
//     function decode(s) {
//         return config.raw ? s : decodeURIComponent(s);
//     }
//
//     function stringifyCookieValue(value) {
//         return encode(config.json ? JSON.stringify(value) : String(value));
//     }
//
//     function parseCookieValue(s) {
//         if (s.indexOf('"') === 0) {
//             // This is a quoted cookie as according to RFC2068, unescape...
//             s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
//         }
//
//         try {
//             // Replace server-side written pluses with spaces.
//             // If we can't decode the cookie, ignore it, it's unusable.
//             // If we can't parse the cookie, ignore it, it's unusable.
//             s = decodeURIComponent(s.replace(pluses, ' '));
//             return config.json ? JSON.parse(s) : s;
//         } catch(e) {}
//     }
//
//     function read(s, converter) {
//         var value = config.raw ? s : parseCookieValue(s);
//         return $.isFunction(converter) ? converter(value) : value;
//     }
//
//     var config = $.cookie = function (key, value, options) {
//
//         // Write
//
//         if (arguments.length > 1 && !$.isFunction(value)) {
//             options = $.extend({}, config.defaults, options);
//
//             if (typeof options.expires === 'number') {
//                 var days = options.expires, t = options.expires = new Date();
//                 t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
//             }
//
//             return (document.cookie = [
//                 encode(key), '=', stringifyCookieValue(value),
//                 options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
//                 options.path    ? '; path=' + options.path : '',
//                 options.domain  ? '; domain=' + options.domain : '',
//                 options.secure  ? '; secure' : ''
//             ].join(''));
//         }
//
//         // Read
//
//         var result = key ? undefined : {},
//             // To prevent the for loop in the first place assign an empty array
//             // in case there are no cookies at all. Also prevents odd result when
//             // calling $.cookie().
//             cookies = document.cookie ? document.cookie.split('; ') : [],
//             i = 0,
//             l = cookies.length;
//
//         for (; i < l; i++) {
//             var parts = cookies[i].split('='),
//                 name = decode(parts.shift()),
//                 cookie = parts.join('=');
//
//             if (key === name) {
//                 // If second argument (value) is a function it's a converter...
//                 result = read(cookie, value);
//                 break;
//             }
//
//             // Prevent storing a cookie that we couldn't decode.
//             if (!key && (cookie = read(cookie)) !== undefined) {
//                 result[name] = cookie;
//             }
//         }
//
//         return result;
//     };
//
//     // config.defaults = {};
//     config.defaults = {path:'/'};
//
//     $.removeCookie = function (key, options) {
//         // Must not alter options, thus extending a fresh object...
//         $.cookie(key, '', $.extend({}, options, { expires: -1 }));
//         return !$.cookie(key);
//     };
//
// }));
// /*___________________________________________________________________________________________________________________________________________________
//  _ jquery.mb.components                                                                                                                             _
//  _                                                                                                                                                  _
//  _ file: jquery.mb.YTPlayer.src.js                                                                                                                  _
//  _ last modified: 05/01/16 17.43                                                                                                                    _
//  _                                                                                                                                                  _
//  _ Open Lab s.r.l., Florence - Italy                                                                                                                _
//  _                                                                                                                                                  _
//  _ email: matteo@open-lab.com                                                                                                                       _
//  _ site: http://pupunzi.com                                                                                                                         _
//  _       http://open-lab.com                                                                                                                        _
//  _ blog: http://pupunzi.open-lab.com                                                                                                                _
//  _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
//  _                                                                                                                                                  _
//  _ Licences: MIT, GPL                                                                                                                               _
//  _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
//  _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
//  _                                                                                                                                                  _
//  _ Copyright (c) 2001-2016. Matteo Bicocchi (Pupunzi);                                                                                              _
//  ___________________________________________________________________________________________________________________________________________________*/
// var ytp = ytp || {};
//
// function onYouTubeIframeAPIReady() {
//     if( ytp.YTAPIReady ) return;
//     ytp.YTAPIReady = true;
//     $J( document ).trigger( "YTAPIReady" );
// }
//
// var getYTPVideoID = function( url ) {
//     var videoID, playlistID;
//     if( url.indexOf( "youtu.be" ) > 0 ) {
//         videoID = url.substr( url.lastIndexOf( "/" ) + 1, url.length );
//         playlistID = videoID.indexOf( "?list=" ) > 0 ? videoID.substr( videoID.lastIndexOf( "=" ), videoID.length ) : null;
//         videoID = playlistID ? videoID.substr( 0, videoID.lastIndexOf( "?" ) ) : videoID;
//     } else if( url.indexOf( "http" ) > -1 ) {
//         //videoID = url.match( /([\/&]v\/([^&#]*))|([\\?&]v=([^&#]*))/ )[ 1 ];
//         videoID = url.match( /[\\?&]v=([^&#]*)/ )[ 1 ];
//         playlistID = url.indexOf( "list=" ) > 0 ? url.match( /[\\?&]list=([^&#]*)/ )[ 1 ] : null;
//     } else {
//         videoID = url.length > 15 ? null : url;
//         playlistID = videoID ? null : url;
//     }
//     return {
//         videoID: videoID,
//         playlistID: playlistID
//     };
// };
//
// ( function( $J, ytp ) {
//
//     $J.mbYTPlayer = {
//         name: "jquery.mb.YTPlayer",
//         version: "3.0.0",
//         build: "5678",
//         author: "Matteo Bicocchi",
//         apiKey: "",
//         defaults: {
//             containment: "body",
//             ratio: "auto", // "auto", "16/9", "4/3"
//             videoURL: null,
//             playlistURL: null,
//             startAt: 0,
//             stopAt: 0,
//             autoPlay: true,
//             vol: 50, // 1 to 100
//             addRaster: false,
//             opacity: 1,
//             quality: "default", //or “small”, “medium”, “large”, “hd720”, “hd1080”, “highres”
//             mute: false,
//             loop: true,
//             showControls: true,
//             showAnnotations: false,
//             showYTLogo: true,
//             stopMovieOnBlur: true,
//             realfullscreen: true,
//             gaTrack: true,
//             optimizeDisplay: true,
//             onReady: function( player ) {}
//         },
//         /**
//          *  @fontface icons
//          *  */
//         controls: {
//             play: "P",
//             pause: "p",
//             mute: "M",
//             unmute: "A",
//             onlyYT: "O",
//             showSite: "R",
//             ytLogo: "Y"
//         },
//         locationProtocol: "https:",
//         /**
//          *
//          * @param options
//          * @returns [players]
//          */
//         buildPlayer: function( options ) {
//             return this.each( function() {
//                 var YTPlayer = this;
//                 var $YTPlayer = $J( YTPlayer );
//                 YTPlayer.loop = 0;
//                 YTPlayer.opt = {};
//                 YTPlayer.state = {};
//                 YTPlayer.filtersEnabled = true;
//
//                 YTPlayer.id = YTPlayer.id || "YTP_" + new Date().getTime();
//
//                 YTPlayer.filters = {
//                     grayscale: {
//                         value: 0,
//                         unit: "%"
//                     },
//                     hue_rotate: {
//                         value: 0,
//                         unit: "deg"
//                     },
//                     invert: {
//                         value: 0,
//                         unit: "%"
//                     },
//                     opacity: {
//                         value: 0,
//                         unit: "%"
//                     },
//                     saturate: {
//                         value: 0,
//                         unit: "%"
//                     },
//                     sepia: {
//                         value: 0,
//                         unit: "%"
//                     },
//                     brightness: {
//                         value: 0,
//                         unit: "%"
//                     },
//                     contrast: {
//                         value: 0,
//                         unit: "%"
//                     },
//                     blur: {
//                         value: 0,
//                         unit: "px"
//                     }
//                 };
//                 $YTPlayer.addClass( "mb_YTPlayer" );
//                 var property = $YTPlayer.data( "property" ) && typeof $YTPlayer.data( "property" ) == "string" ? eval( '(' + $YTPlayer.data( "property" ) + ')' ) : $YTPlayer.data( "property" );
//                 if( typeof property != "undefined" && typeof property.vol != "undefined" ) property.vol = property.vol === 0 ? property.vol = 1 : property.vol;
//
//                 $J.extend( YTPlayer.opt, $J.mbYTPlayer.defaults, options, property );
//
//                 if( !YTPlayer.hasChanged ) {
//                     YTPlayer.defaultOpt = {};
//                     //					$J.extend( YTPlayer.defaultOpt, $J.mbYTPlayer.defaults, options, property );
//                     $J.extend( YTPlayer.defaultOpt, $J.mbYTPlayer.defaults, options );
//                 }
//
//                 if( YTPlayer.opt.loop == "true" )
//                     YTPlayer.opt.loop = 9999;
//
//                 YTPlayer.isRetina = ( window.retina || window.devicePixelRatio > 1 );
//                 var isIframe = function() {
//                     var isIfr = false;
//                     try {
//                         if( self.location.href != top.location.href ) isIfr = true;
//                     } catch( e ) {
//                         isIfr = true;
//                     }
//                     return isIfr;
//                 };
//                 YTPlayer.canGoFullScreen = !( $J.browser.msie || $J.browser.opera || isIframe() );
//                 if( !YTPlayer.canGoFullScreen ) YTPlayer.opt.realfullscreen = false;
//                 if( !$YTPlayer.attr( "id" ) ) $YTPlayer.attr( "id", "video_" + new Date().getTime() );
//                 var playerID = "mbYTP_" + YTPlayer.id;
//                 YTPlayer.isAlone = false;
//                 YTPlayer.hasFocus = true;
//                 var videoID = this.opt.videoURL ? getYTPVideoID( this.opt.videoURL ).videoID : $YTPlayer.attr( "href" ) ? getYTPVideoID( $YTPlayer.attr( "href" ) ).videoID : false;
//                 var playlistID = this.opt.videoURL ? getYTPVideoID( this.opt.videoURL ).playlistID : $YTPlayer.attr( "href" ) ? getYTPVideoID( $YTPlayer.attr( "href" ) ).playlistID : false;
//                 YTPlayer.videoID = videoID;
//                 YTPlayer.playlistID = playlistID;
//                 YTPlayer.opt.showAnnotations = ( YTPlayer.opt.showAnnotations ) ? '0' : '3';
//                 var playerVars = {
//                     'autoplay': 0,
//                     'modestbranding': 1,
//                     'controls': 0,
//                     'showinfo': 0,
//                     'rel': 0,
//                     'enablejsapi': 1,
//                     'version': 3,
//                     'playerapiid': playerID,
//                     'origin': '*',
//                     'allowfullscreen': true,
//                     'wmode': 'transparent',
//                     'iv_load_policy': YTPlayer.opt.showAnnotations
//                 };
//                 if( document.createElement( 'video' ).canPlayType ) $J.extend( playerVars, {
//                     'html5': 1
//                 } );
//                 if( $J.browser.msie && $J.browser.version < 9 ) this.opt.opacity = 1;
//                 var playerBox = $J( "<div/>" ).attr( "id", playerID ).addClass( "playerBox" );
//                 var overlay = $J( "<div/>" ).css( {
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%"
//                 } ).addClass( "YTPOverlay" );
//                 YTPlayer.isSelf = YTPlayer.opt.containment == "self";
//                 YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = YTPlayer.opt.containment == "self" ? $J( this ) : $J( YTPlayer.opt.containment );
//                 YTPlayer.isBackground = YTPlayer.opt.containment.get( 0 ).tagName.toLowerCase() == "body";
//                 if( YTPlayer.isBackground && ytp.backgroundIsInited ) return;
//                 var isPlayer = YTPlayer.opt.containment.is( $J( this ) );
//                 YTPlayer.canPlayOnMobile = isPlayer && $J( this ).children().length === 0;
//                 if( !isPlayer ) {
//                     $YTPlayer.hide();
//                 } else {
//                     YTPlayer.isPlayer = true;
//                 }
//
//                 if( $J.browser.mobile && !YTPlayer.canPlayOnMobile ) {
//                     $YTPlayer.remove();
//                     return;
//                 }
//
//                 var wrapper = $J( "<div/>" ).addClass( "mbYTP_wrapper" ).attr( "id", "wrapper_" + playerID );
//                 wrapper.css( {
//                     position: "absolute",
//                     zIndex: 0,
//                     minWidth: "100%",
//                     minHeight: "100%",
//                     left: 0,
//                     top: 0,
//                     overflow: "hidden",
//                     opacity: 0
//                 } );
//
//                 playerBox.css( {
//                     position: "absolute",
//                     zIndex: 0,
//                     width: "100%",
//                     height: "100%",
//                     top: 0,
//                     left: 0,
//                     overflow: "hidden"
//                 } );
//                 wrapper.append( playerBox );
//                 YTPlayer.opt.containment.children().not( "script, style" ).each( function() {
//                     if( $J( this ).css( "position" ) == "static" ) $J( this ).css( "position", "relative" );
//                 } );
//                 if( YTPlayer.isBackground ) {
//                     $J( "body" ).css( {
//                         boxSizing: "border-box"
//                     } );
//                     wrapper.css( {
//                         position: "fixed",
//                         top: 0,
//                         left: 0,
//                         zIndex: 0
//                     } );
//                     $YTPlayer.hide();
//                 } else if( YTPlayer.opt.containment.css( "position" ) == "static" )
//                     YTPlayer.opt.containment.css( {
//                         position: "relative"
//                     } );
//
//                 YTPlayer.opt.containment.prepend( wrapper );
//                 YTPlayer.wrapper = wrapper;
//                 playerBox.css( {
//                     opacity: 1
//                 } );
//
//                 if( !$J.browser.mobile ) {
//                     playerBox.after( overlay );
//                     YTPlayer.overlay = overlay;
//                 }
//
//                 if( !YTPlayer.isBackground ) {
//                     overlay.on( "mouseenter", function() {
//                         if( YTPlayer.controlBar ) YTPlayer.controlBar.addClass( "visible" );
//                     } ).on( "mouseleave", function() {
//                         if( YTPlayer.controlBar ) YTPlayer.controlBar.removeClass( "visible" );
//                     } );
//                 }
//                 if( !ytp.YTAPIReady ) {
//                     $J( "#YTAPI" ).remove();
//                     var tag = $J( "<script></script>" ).attr( {
//                         "src": $J.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + $J.mbYTPlayer.version,
//                         "id": "YTAPI"
//                     } );
//                     $J( "head" ).prepend( tag );
//                 } else {
//                     setTimeout( function() {
//                         $J( document ).trigger( "YTAPIReady" );
//                     }, 100 )
//                 }
//
//                 $J( document ).on( "YTAPIReady", function() {
//                     if( ( YTPlayer.isBackground && ytp.backgroundIsInited ) || YTPlayer.isInit ) return;
//                     if( YTPlayer.isBackground ) {
//                         ytp.backgroundIsInited = true;
//                     }
//
//                     YTPlayer.opt.autoPlay = typeof YTPlayer.opt.autoPlay == "undefined" ? ( YTPlayer.isBackground ? true : false ) : YTPlayer.opt.autoPlay;
//                     YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100;
//                     $J.mbYTPlayer.getDataFromAPI( YTPlayer );
//                     $J( YTPlayer ).on( "YTPChanged", function() {
//                         if( YTPlayer.isInit ) return;
//                         YTPlayer.isInit = true;
//
//                         //if is mobile && isPlayer fallback to the default YT player
//                         if( $J.browser.mobile && YTPlayer.canPlayOnMobile ) {
//                             // Try to adjust the player dimention
//                             if( YTPlayer.opt.containment.outerWidth() > $J( window ).width() ) {
//                                 YTPlayer.opt.containment.css( {
//                                     maxWidth: "100%"
//                                 } );
//                                 var h = YTPlayer.opt.containment.outerWidth() * .6;
//                                 YTPlayer.opt.containment.css( {
//                                     maxHeight: h
//                                 } );
//                             }
//                             new YT.Player( playerID, {
//                                 videoId: YTPlayer.videoID.toString(),
//                                 height: '100%',
//                                 width: '100%',
//                                 events: {
//                                     'onReady': function( event ) {
//                                         YTPlayer.player = event.target;
//                                         playerBox.css( {
//                                             opacity: 1
//                                         } );
//                                         YTPlayer.wrapper.css( {
//                                             opacity: 1
//                                         } );
//                                     }
//                                 }
//                             } );
//                             return;
//                         }
//
//                         new YT.Player( playerID, {
//                             videoId: YTPlayer.videoID.toString(),
//                             playerVars: playerVars,
//                             events: {
//                                 'onReady': function( event ) {
//                                     YTPlayer.player = event.target;
//                                     if( YTPlayer.isReady ) return;
//                                     YTPlayer.isReady = YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ? false : true;
//                                     YTPlayer.playerEl = YTPlayer.player.getIframe();
//
//                                     $J( YTPlayer.playerEl ).unselectable();
//
//                                     $YTPlayer.optimizeDisplay();
//                                     YTPlayer.videoID = videoID;
//                                     $J( window ).off( "resize.YTP_" + YTPlayer.id ).on( "resize.YTP_" + YTPlayer.id, function() {
//                                         $YTPlayer.optimizeDisplay();
//                                     } );
//
//                                     $J.mbYTPlayer.checkForState( YTPlayer );
//                                 },
//                                 /**
//                                  *
//                                  * @param event
//                                  *
//                                  * -1 (unstarted)
//                                  * 0 (ended)
//                                  * 1 (playing)
//                                  * 2 (paused)
//                                  * 3 (buffering)
//                                  * 5 (video cued).
//                                  *
//                                  *
//                                  */
//                                 'onStateChange': function( event ) {
//                                     if( typeof event.target.getPlayerState != "function" ) return;
//                                     var state = event.target.getPlayerState();
//
//                                     if( YTPlayer.state == state ) return;
//
//                                     if( YTPlayer.preventTrigger ) {
//                                         YTPlayer.preventTrigger = false;
//                                         return
//                                     }
//
//                                     YTPlayer.state = state;
//
//                                     var eventType;
//                                     switch( state ) {
//                                         case -1: //----------------------------------------------- unstarted
//                                             eventType = "YTPUnstarted";
//                                             break;
//                                         case 0: //------------------------------------------------ ended
//                                             eventType = "YTPEnd";
//                                             break;
//                                         case 1: //------------------------------------------------ play
//                                             eventType = "YTPPlay";
//                                             if( YTPlayer.controlBar ) YTPlayer.controlBar.find( ".mb_YTPPlaypause" ).html( $J.mbYTPlayer.controls.pause );
//
//                                             if( typeof _gaq != "undefined" && eval( YTPlayer.opt.gaTrack ) ) _gaq.push( [ '_trackEvent', 'YTPlayer', 'Play', ( YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString() ) ] );
//                                             if( typeof ga != "undefined" && eval( YTPlayer.opt.gaTrack ) ) ga( 'send', 'event', 'YTPlayer', 'play', ( YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString() ) );
//
//                                             break;
//                                         case 2: //------------------------------------------------ pause
//                                             eventType = "YTPPause";
//                                             if( YTPlayer.controlBar ) YTPlayer.controlBar.find( ".mb_YTPPlaypause" ).html( $J.mbYTPlayer.controls.play );
//                                             break;
//                                         case 3: //------------------------------------------------ buffer
//                                             YTPlayer.player.setPlaybackQuality( YTPlayer.opt.quality );
//                                             eventType = "YTPBuffering";
//                                             if( YTPlayer.controlBar ) YTPlayer.controlBar.find( ".mb_YTPPlaypause" ).html( $J.mbYTPlayer.controls.play );
//                                             break;
//                                         case 5: //------------------------------------------------ cued
//                                             eventType = "YTPCued";
//                                             break;
//                                         default:
//                                             break;
//                                     }
//                                     // Trigger state events
//                                     var YTPEvent = $J.Event( eventType );
//                                     YTPEvent.time = YTPlayer.player.time;
//                                     if( YTPlayer.canTrigger ) $J( YTPlayer ).trigger( YTPEvent );
//                                 },
//                                 /**
//                                  *
//                                  * @param e
//                                  */
//                                 'onPlaybackQualityChange': function( e ) {
//                                     var quality = e.target.getPlaybackQuality();
//                                     var YTPQualityChange = $J.Event( "YTPQualityChange" );
//                                     YTPQualityChange.quality = quality;
//                                     $J( YTPlayer ).trigger( YTPQualityChange );
//                                 },
//                                 /**
//                                  *
//                                  * @param err
//                                  */
//                                 'onError': function( err ) {
//                                     if( err.data == 150 ) {
//                                         console.log( "Embedding this video is restricted by Youtube." );
//                                         if( YTPlayer.isPlayList ) $J( YTPlayer ).playNext();
//                                     }
//                                     if( err.data == 2 && YTPlayer.isPlayList ) $J( YTPlayer ).playNext();
//                                     if( typeof YTPlayer.opt.onError == "function" ) YTPlayer.opt.onError( $YTPlayer, err );
//                                 }
//                             }
//                         } );
//                     } );
//                 } )
//             } );
//         },
//         /**
//          *
//          * @param YTPlayer
//          */
//         getDataFromAPI: function( YTPlayer ) {
//             YTPlayer.videoData = $J.mbStorage.get( "YTPlayer_data_" + YTPlayer.videoID );
//             $J( YTPlayer ).off( "YTPData.YTPlayer" ).on( "YTPData.YTPlayer", function() {
//                 if( YTPlayer.hasData ) {
//
//                     if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
//                         var bgndURL = YTPlayer.videoData.thumb_max || YTPlayer.videoData.thumb_high || YTPlayer.videoData.thumb_medium;
//                         YTPlayer.opt.containment.css( {
//                             background: "rgba(0,0,0,0.5) url(" + bgndURL + ") center center",
//                             backgroundSize: "cover"
//                         } );
//                         YTPlayer.opt.backgroundUrl = bgndURL;
//                     }
//                 }
//             } );
//
//             if( YTPlayer.videoData ) {
//
//                 setTimeout( function() {
//                     YTPlayer.opt.ratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
//                     YTPlayer.dataReceived = true;
//                     $J( YTPlayer ).trigger( "YTPChanged" );
//                     var YTPData = $J.Event( "YTPData" );
//                     YTPData.prop = {};
//                     for( var x in YTPlayer.videoData ) YTPData.prop[ x ] = YTPlayer.videoData[ x ];
//                     $J( YTPlayer ).trigger( YTPData );
//                 }, 500 );
//
//                 YTPlayer.hasData = true;
//             } else if( $J.mbYTPlayer.apiKey ) {
//                 // Get video info from API3 (needs api key)
//                 // snippet,player,contentDetails,statistics,status
//                 $J.getJSON( $J.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + YTPlayer.videoID + "&key=" + $J.mbYTPlayer.apiKey + "&part=snippet", function( data ) {
//                     YTPlayer.dataReceived = true;
//                     $J( YTPlayer ).trigger( "YTPChanged" );
//
//                     function parseYTPlayer_data( data ) {
//                         YTPlayer.videoData = {};
//                         YTPlayer.videoData.id = YTPlayer.videoID;
//                         YTPlayer.videoData.channelTitle = data.channelTitle;
//                         YTPlayer.videoData.title = data.title;
//                         YTPlayer.videoData.description = data.description.length < 400 ? data.description : data.description.substring( 0, 400 ) + " ...";
//                         YTPlayer.videoData.aspectratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
//                         YTPlayer.opt.ratio = YTPlayer.videoData.aspectratio;
//                         YTPlayer.videoData.thumb_max = data.thumbnails.maxres ? data.thumbnails.maxres.url : null;
//                         YTPlayer.videoData.thumb_high = data.thumbnails.high ? data.thumbnails.high.url : null;
//                         YTPlayer.videoData.thumb_medium = data.thumbnails.medium ? data.thumbnails.medium.url : null;
//                         $J.mbStorage.set( "YTPlayer_data_" + YTPlayer.videoID, YTPlayer.videoData );
//                     }
//                     parseYTPlayer_data( data.items[ 0 ].snippet );
//                     YTPlayer.hasData = true;
//                     var YTPData = $J.Event( "YTPData" );
//                     YTPData.prop = {};
//                     for( var x in YTPlayer.videoData ) YTPData.prop[ x ] = YTPlayer.videoData[ x ];
//                     $J( YTPlayer ).trigger( YTPData );
//                 } );
//             } else {
//                 setTimeout( function() {
//                     $J( YTPlayer ).trigger( "YTPChanged" );
//                 }, 50 );
//                 if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
//                     var bgndURL = $J.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + YTPlayer.videoID + "/hqdefault.jpg";
//                     YTPlayer.opt.containment.css( {
//                         background: "rgba(0,0,0,0.5) url(" + bgndURL + ") center center",
//                         backgroundSize: "cover"
//                     } );
//                     YTPlayer.opt.backgroundUrl = bgndURL;
//                 }
//                 YTPlayer.videoData = null;
//                 YTPlayer.opt.ratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
//             }
//             if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
//                 YTPlayer.loading = $J( "<div/>" ).addClass( "loading" ).html( "Loading" ).hide();
//                 $J( YTPlayer ).append( YTPlayer.loading );
//                 YTPlayer.loading.fadeIn();
//             }
//         },
//         /**
//          *
//          */
//         removeStoredData: function() {
//             $J.mbStorage.remove();
//         },
//         /**
//          *
//          * @returns {*|YTPlayer.videoData}
//          */
//         getVideoData: function() {
//             var YTPlayer = this.get( 0 );
//             return YTPlayer.videoData;
//         },
//         /**
//          *
//          * @returns {*|YTPlayer.videoID|boolean}
//          */
//         getVideoID: function() {
//             var YTPlayer = this.get( 0 );
//             return YTPlayer.videoID || false;
//         },
//         /**
//          *
//          * @param quality
//          */
//         setVideoQuality: function( quality ) {
//             var YTPlayer = this.get( 0 );
//             //if( !$J.browser.chrome )
//             YTPlayer.player.setPlaybackQuality( quality );
//         },
//         /**
//          * @param videos
//          * @param shuffle
//          * @param callback
//          * @returns {$J.mbYTPlayer}
//          */
//
//         playlist: function( videos, shuffle, callback ) {
//             var $YTPlayer = this;
//             var YTPlayer = $YTPlayer.get( 0 );
//             YTPlayer.isPlayList = true;
//             if( shuffle ) videos = $J.shuffle( videos );
//             if( !YTPlayer.videoID ) {
//                 YTPlayer.videos = videos;
//                 YTPlayer.videoCounter = 0;
//                 YTPlayer.videoLength = videos.length;
//                 $J( YTPlayer ).data( "property", videos[ 0 ] );
//                 $J( YTPlayer ).mb_YTPlayer();
//             }
//             if( typeof callback == "function" ) $J( YTPlayer ).one( "YTPChanged", function() {
//                 callback( YTPlayer );
//             } );
//             $J( YTPlayer ).on( "YTPEnd", function() {
//                 $J( YTPlayer ).playNext();
//             } );
//             return $YTPlayer;
//         },
//         /**
//          *
//          * @returns {$J.mbYTPlayer}
//          */
//         playNext: function() {
//             var YTPlayer = this.get( 0 );
//
//             if( YTPlayer.checkForStartAt ) {
//                 clearTimeout( YTPlayer.checkForStartAt );
//                 clearInterval( YTPlayer.getState );
//             }
//
//             YTPlayer.videoCounter++;
//             if( YTPlayer.videoCounter >= YTPlayer.videoLength ) YTPlayer.videoCounter = 0;
//             $J( YTPlayer ).changeMovie( YTPlayer.videos[ YTPlayer.videoCounter ] );
//             return this;
//         },
//         /**
//          *
//          * @returns {$J.mbYTPlayer}
//          */
//         playPrev: function() {
//             var YTPlayer = this.get( 0 );
//
//             if( YTPlayer.checkForStartAt ) {
//                 clearInterval( YTPlayer.checkForStartAt );
//                 clearInterval( YTPlayer.getState );
//             }
//
//             YTPlayer.videoCounter--;
//             if( YTPlayer.videoCounter < 0 ) YTPlayer.videoCounter = YTPlayer.videoLength - 1;
//             $J( YTPlayer ).changeMovie( YTPlayer.videos[ YTPlayer.videoCounter ] );
//             return this;
//         },
//         /**
//          *
//          * @param opt
//          */
//         changeMovie: function( opt ) {
//
//             var YTPlayer = this.get( 0 );
//             YTPlayer.opt.startAt = 0;
//             YTPlayer.opt.stopAt = 0;
//             YTPlayer.opt.mute = true;
//             YTPlayer.hasData = false;
//             YTPlayer.hasChanged = true;
//             YTPlayer.player.loopTime = undefined;
//
//             if( opt ) $J.extend( YTPlayer.opt, YTPlayer.defaultOpt, opt );
//             YTPlayer.videoID = getYTPVideoID( YTPlayer.opt.videoURL ).videoID;
//
//             if( YTPlayer.opt.loop == "true" )
//                 YTPlayer.opt.loop = 9999;
//
//             $J( YTPlayer.playerEl ).CSSAnimate( {
//                 opacity: 0
//             }, 200, function() {
//
//                 var YTPChangeMovie = $J.Event( "YTPChangeMovie" );
//                 YTPChangeMovie.time = YTPlayer.player.time;
//                 YTPChangeMovie.videoId = YTPlayer.videoID;
//                 $J( YTPlayer ).trigger( YTPChangeMovie );
//
//                 $J( YTPlayer ).YTPGetPlayer().cueVideoByUrl( encodeURI( $J.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + YTPlayer.videoID ), 1, YTPlayer.opt.quality );
//                 $J( YTPlayer ).optimizeDisplay();
//
//                 $J.mbYTPlayer.checkForState( YTPlayer );
//                 $J.mbYTPlayer.getDataFromAPI( YTPlayer );
//                 return this;
//             } );
//         },
//         /**
//          *
//          * @returns {player}
//          */
//         getPlayer: function() {
//             return $J( this ).get( 0 ).player;
//         },
//
//         playerDestroy: function() {
//             var YTPlayer = this.get( 0 );
//             ytp.YTAPIReady = true;
//             ytp.backgroundIsInited = false;
//             YTPlayer.isInit = false;
//             YTPlayer.videoID = null;
//             var playerBox = YTPlayer.wrapper;
//             playerBox.remove();
//             $J( "#controlBar_" + YTPlayer.id ).remove();
//             clearInterval( YTPlayer.checkForStartAt );
//             clearInterval( YTPlayer.getState );
//             return this;
//         },
//
//         /**
//          *
//          * @param real
//          * @returns {$J.mbYTPlayer}
//          */
//         fullscreen: function( real ) {
//             var YTPlayer = this.get( 0 );
//             if( typeof real == "undefined" ) real = YTPlayer.opt.realfullscreen;
//             real = eval( real );
//             var controls = $J( "#controlBar_" + YTPlayer.id );
//             var fullScreenBtn = controls.find( ".mb_OnlyYT" );
//             var videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
//             //var videoWrapper = YTPlayer.wrapper;
//             if( real ) {
//                 var fullscreenchange = $J.browser.mozilla ? "mozfullscreenchange" : $J.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
//                 $J( document ).off( fullscreenchange ).on( fullscreenchange, function() {
//                     var isFullScreen = RunPrefixMethod( document, "IsFullScreen" ) || RunPrefixMethod( document, "FullScreen" );
//                     if( !isFullScreen ) {
//                         YTPlayer.isAlone = false;
//                         fullScreenBtn.html( $J.mbYTPlayer.controls.onlyYT );
//                         $J( YTPlayer ).YTPSetVideoQuality( YTPlayer.opt.quality );
//                         videoWrapper.removeClass( "YTPFullscreen" );
//                         videoWrapper.CSSAnimate( {
//                             opacity: YTPlayer.opt.opacity
//                         }, 500 );
//                         videoWrapper.css( {
//                             zIndex: 0
//                         } );
//                         if( YTPlayer.isBackground ) {
//                             $J( "body" ).after( controls );
//                         } else {
//                             YTPlayer.wrapper.before( controls );
//                         }
//                         $J( window ).resize();
//                         $J( YTPlayer ).trigger( "YTPFullScreenEnd" );
//                     } else {
//                         $J( YTPlayer ).YTPSetVideoQuality( "default" );
//                         $J( YTPlayer ).trigger( "YTPFullScreenStart" );
//                     }
//                 } );
//             }
//             if( !YTPlayer.isAlone ) {
//                 function hideMouse() {
//                     YTPlayer.overlay.css( {
//                         cursor: "none"
//                     } );
//                 }
//                 $J( document ).on( "mousemove.YTPlayer", function( e ) {
//                     YTPlayer.overlay.css( {
//                         cursor: "auto"
//                     } );
//                     clearTimeout( YTPlayer.hideCursor );
//                     if( !$J( e.target ).parents().is( ".mb_YTPBar" ) ) YTPlayer.hideCursor = setTimeout( hideMouse, 3000 );
//                 } );
//                 hideMouse();
//                 if( real ) {
//                     videoWrapper.css( {
//                         opacity: 0
//                     } );
//                     videoWrapper.addClass( "YTPFullscreen" );
//                     launchFullscreen( videoWrapper.get( 0 ) );
//                     setTimeout( function() {
//                         videoWrapper.CSSAnimate( {
//                             opacity: 1
//                         }, 1000 );
//                         YTPlayer.wrapper.append( controls );
//                         $J( YTPlayer ).optimizeDisplay();
//                         YTPlayer.player.seekTo( YTPlayer.player.getCurrentTime() + .1, true );
//                     }, 500 )
//                 } else videoWrapper.css( {
//                     zIndex: 10000
//                 } ).CSSAnimate( {
//                     opacity: 1
//                 }, 1000 );
//                 fullScreenBtn.html( $J.mbYTPlayer.controls.showSite );
//                 YTPlayer.isAlone = true;
//             } else {
//                 $J( document ).off( "mousemove.YTPlayer" );
//                 YTPlayer.overlay.css( {
//                     cursor: "auto"
//                 } );
//                 if( real ) {
//                     cancelFullscreen();
//                 } else {
//                     videoWrapper.CSSAnimate( {
//                         opacity: YTPlayer.opt.opacity
//                     }, 500 );
//                     videoWrapper.css( {
//                         zIndex: 0
//                     } );
//                 }
//                 fullScreenBtn.html( $J.mbYTPlayer.controls.onlyYT );
//                 YTPlayer.isAlone = false;
//             }
//
//             function RunPrefixMethod( obj, method ) {
//                 var pfx = [ "webkit", "moz", "ms", "o", "" ];
//                 var p = 0,
//                     m, t;
//                 while( p < pfx.length && !obj[ m ] ) {
//                     m = method;
//                     if( pfx[ p ] == "" ) {
//                         m = m.substr( 0, 1 ).toLowerCase() + m.substr( 1 );
//                     }
//                     m = pfx[ p ] + m;
//                     t = typeof obj[ m ];
//                     if( t != "undefined" ) {
//                         pfx = [ pfx[ p ] ];
//                         return( t == "function" ? obj[ m ]() : obj[ m ] );
//                     }
//                     p++;
//                 }
//             }
//
//             function launchFullscreen( element ) {
//                 RunPrefixMethod( element, "RequestFullScreen" );
//             }
//
//             function cancelFullscreen() {
//                 if( RunPrefixMethod( document, "FullScreen" ) || RunPrefixMethod( document, "IsFullScreen" ) ) {
//                     RunPrefixMethod( document, "CancelFullScreen" );
//                 }
//             }
//             return this;
//         },
//         /**
//          *
//          * @returns {$J.mbYTPlayer}
//          */
//         toggleLoops: function() {
//             var YTPlayer = this.get( 0 );
//             var data = YTPlayer.opt;
//             if( data.loop == 1 ) {
//                 data.loop = 0;
//             } else {
//                 if( data.startAt ) {
//                     YTPlayer.player.seekTo( data.startAt );
//                 } else {
//                     YTPlayer.player.playVideo();
//                 }
//                 data.loop = 1;
//             }
//             return this;
//         },
//         /**
//          *
//          * @returns {$J.mbYTPlayer}
//          */
//         play: function() {
//             var YTPlayer = this.get( 0 );
//             if( !YTPlayer.isReady ) return;
//
//             YTPlayer.player.playVideo();
//             YTPlayer.wrapper.CSSAnimate( {
//                 opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
//             }, 2000 );
//
//             $J( YTPlayer.playerEl ).CSSAnimate( {
//                 opacity: 1
//             }, 1000 );
//
//             $J( YTPlayer ).css( "background-image", "none" );
//             return this;
//         },
//         /**
//          *
//          * @param callback
//          * @returns {$J.mbYTPlayer}
//          */
//         togglePlay: function( callback ) {
//             var YTPlayer = this.get( 0 );
//             if( YTPlayer.state == 1 ) this.YTPPause();
//             else this.YTPPlay();
//             if( typeof callback == "function" ) {
//                 callback( YTPlayer.state );
//             }
//             return this;
//         },
//         /**
//          *
//          * @returns {$J.mbYTPlayer}
//          */
//         stop: function() {
//             var YTPlayer = this.get( 0 );
//             var controls = $J( "#controlBar_" + YTPlayer.id );
//             var playBtn = controls.find( ".mb_YTPPlaypause" );
//             playBtn.html( $J.mbYTPlayer.controls.play );
//             YTPlayer.player.stopVideo();
//             return this;
//         },
//         /**
//          *
//          * @returns {$J.mbYTPlayer}
//          */
//         pause: function() {
//             var YTPlayer = this.get( 0 );
//             YTPlayer.player.pauseVideo();
//             return this;
//         },
//         /**
//          *
//          * @param val
//          * @returns {$J.mbYTPlayer}
//          */
//         seekTo: function( val ) {
//             var YTPlayer = this.get( 0 );
//             YTPlayer.player.seekTo( val, true );
//             return this;
//         },
//         /**
//          *
//          * @param val
//          * @returns {$J.mbYTPlayer}
//          */
//         setVolume: function( val ) {
//             var YTPlayer = this.get( 0 );
//             if( !val && !YTPlayer.opt.vol && YTPlayer.player.getVolume() == 0 ) $J( YTPlayer ).YTPUnmute();
//             else if( ( !val && YTPlayer.player.getVolume() > 0 ) || ( val && YTPlayer.opt.vol == val ) ) {
//                 if( !YTPlayer.isMute ) $J( YTPlayer ).YTPMute();
//                 else $J( YTPlayer ).YTPUnmute();
//             } else {
//                 YTPlayer.opt.vol = val;
//                 YTPlayer.player.setVolume( YTPlayer.opt.vol );
//                 if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.updateSliderVal( val )
//             }
//             return this;
//         },
//         /**
//          *
//          * @returns {$J.mbYTPlayer}
//          */
//         mute: function() {
//             var YTPlayer = this.get( 0 );
//             if( YTPlayer.isMute ) return;
//             YTPlayer.player.mute();
//             YTPlayer.isMute = true;
//             YTPlayer.player.setVolume( 0 );
//             if( YTPlayer.volumeBar && YTPlayer.volumeBar.length && YTPlayer.volumeBar.width() > 10 ) {
//                 YTPlayer.volumeBar.updateSliderVal( 0 );
//             }
//             var controls = $J( "#controlBar_" + YTPlayer.id );
//             var muteBtn = controls.find( ".mb_YTPMuteUnmute" );
//             muteBtn.html( $J.mbYTPlayer.controls.unmute );
//             $J( YTPlayer ).addClass( "isMuted" );
//             if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.addClass( "muted" );
//             var YTPEvent = $J.Event( "YTPMuted" );
//             YTPEvent.time = YTPlayer.player.time;
//             if( YTPlayer.canTrigger ) $J( YTPlayer ).trigger( YTPEvent );
//             return this;
//         },
//         /**
//          *
//          * @returns {$J.mbYTPlayer}
//          */
//         unmute: function() {
//             var YTPlayer = this.get( 0 );
//             if( !YTPlayer.isMute ) return;
//             YTPlayer.player.unMute();
//             YTPlayer.isMute = false;
//             YTPlayer.player.setVolume( YTPlayer.opt.vol );
//             if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.updateSliderVal( YTPlayer.opt.vol > 10 ? YTPlayer.opt.vol : 10 );
//             var controls = $J( "#controlBar_" + YTPlayer.id );
//             var muteBtn = controls.find( ".mb_YTPMuteUnmute" );
//             muteBtn.html( $J.mbYTPlayer.controls.mute );
//             $J( YTPlayer ).removeClass( "isMuted" );
//             if( YTPlayer.volumeBar && YTPlayer.volumeBar.length ) YTPlayer.volumeBar.removeClass( "muted" );
//             var YTPEvent = $J.Event( "YTPUnmuted" );
//             YTPEvent.time = YTPlayer.player.time;
//             if( YTPlayer.canTrigger ) $J( YTPlayer ).trigger( YTPEvent );
//             return this;
//         },
//         /**
//          *
//          * @param filter
//          * @param value
//          * @returns {$J.mbYTPlayer}
//          */
//         applyFilter: function( filter, value ) {
//             var YTPlayer = this.get( 0 );
//             YTPlayer.filters[ filter ].value = value;
//             if( YTPlayer.filtersEnabled ) this.YTPEnableFilters();
//             return this;
//         },
//         /**
//          *
//          * @param filters
//          * @returns {$J.mbYTPlayer}
//          */
//         applyFilters: function( filters ) {
//             var YTPlayer = this.get( 0 );
//             this.on( "YTPReady", function() {
//                 for( var key in filters ) {
//                     YTPlayer.filters[ key ].value = filters[ key ];
//                     $J( YTPlayer ).YTPApplyFilter( key, filters[ key ] );
//                 }
//                 $J( YTPlayer ).trigger( "YTPFiltersApplied" );
//             } );
//             return this;
//         },
//         /**
//          *
//          * @param filter
//          * @param value
//          * @returns {*}
//          */
//         toggleFilter: function( filter, value ) {
//             return this.each( function() {
//                 var YTPlayer = this;
//                 if( !YTPlayer.filters[ filter ].value ) YTPlayer.filters[ filter ].value = value;
//                 else YTPlayer.filters[ filter ].value = 0;
//                 if( YTPlayer.filtersEnabled ) $J( this ).YTPEnableFilters();
//             } )
//             return this;
//         },
//         /**
//          *
//          * @param callback
//          * @returns {*}
//          */
//         toggleFilters: function( callback ) {
//             return this.each( function() {
//                 var YTPlayer = this;
//                 if( YTPlayer.filtersEnabled ) {
//                     $J( YTPlayer ).trigger( "YTPDisableFilters" );
//                     $J( YTPlayer ).YTPDisableFilters();
//                 } else {
//                     $J( YTPlayer ).YTPEnableFilters();
//                     $J( YTPlayer ).trigger( "YTPEnableFilters" );
//                 }
//                 if( typeof callback == "function" ) callback( YTPlayer.filtersEnabled );
//             } )
//         },
//         /**
//          *
//          * @returns {*}
//          */
//         disableFilters: function() {
//             return this.each( function() {
//                 var YTPlayer = this;
//                 var iframe = $J( YTPlayer.playerEl );
//                 iframe.css( "-webkit-filter", "" );
//                 iframe.css( "filter", "" );
//                 YTPlayer.filtersEnabled = false;
//             } )
//         },
//         /**
//          *
//          * @returns {*}
//          */
//         enableFilters: function() {
//             return this.each( function() {
//                 var YTPlayer = this;
//                 var iframe = $J( YTPlayer.playerEl );
//                 var filterStyle = "";
//                 for( var key in YTPlayer.filters ) {
//                     if( YTPlayer.filters[ key ].value ) filterStyle += key.replace( "_", "-" ) + "(" + YTPlayer.filters[ key ].value + YTPlayer.filters[ key ].unit + ") ";
//                 }
//                 iframe.css( "-webkit-filter", filterStyle );
//                 iframe.css( "filter", filterStyle );
//                 YTPlayer.filtersEnabled = true;
//             } )
//             return this;
//         },
//         /**
//          *
//          * @param filter
//          * @param callback
//          * @returns {*}
//          */
//         removeFilter: function( filter, callback ) {
//             return this.each( function() {
//                 if( typeof filter == "function" ) {
//                     callback = filter;
//                     filter = null;
//                 }
//                 var YTPlayer = this;
//                 if( !filter )
//                     for( var key in YTPlayer.filters ) {
//                         $J( this ).YTPApplyFilter( key, 0 );
//                         if( typeof callback == "function" ) callback( key );
//                     } else {
//                     $J( this ).YTPApplyFilter( filter, 0 );
//                     if( typeof callback == "function" ) callback( filter );
//                 }
//             } );
//             return this;
//         },
//         /**
//          *
//          */
//         addMask: function( mask ) {
//             var YTPlayer = this.get( 0 );
//             var overlay = YTPlayer.overlay;
//
//             overlay.CSSAnimate( {
//                 opacity: 0
//             }, 500, function() {
//
//                 overlay.css( {
//                     backgroundImage: "url(" + mask + ")",
//                     backgroundRepeat: "no-repeat",
//                     backgroundPosition: "center center",
//                     backgroundSize: "cover"
//                 } );
//
//                 overlay.CSSAnimate( {
//                     opacity: 1
//                 }, 500 );
//
//             } );
//             return this;
//
//         },
//         /**
//          *
//          */
//         removeMask: function() {
//             var YTPlayer = this.get( 0 );
//             var overlay = YTPlayer.overlay;
//             overlay.CSSAnimate( {
//                 opacity: 0
//             }, 500, function() {
//                 overlay.css( {
//                     backgroundImage: "",
//                     backgroundRepeat: "",
//                     backgroundPosition: "",
//                     backgroundSize: ""
//                 } );
//                 overlay.CSSAnimate( {
//                     opacity: 1
//                 }, 500 );
//
//             } );
//
//             return this;
//
//         },
//         /**
//          *
//          * @returns {{totalTime: number, currentTime: number}}
//          */
//         manageProgress: function() {
//             var YTPlayer = this.get( 0 );
//             var controls = $J( "#controlBar_" + YTPlayer.id );
//             var progressBar = controls.find( ".mb_YTPProgress" );
//             var loadedBar = controls.find( ".mb_YTPLoaded" );
//             var timeBar = controls.find( ".mb_YTPseekbar" );
//             var totW = progressBar.outerWidth();
//             var currentTime = Math.floor( YTPlayer.player.getCurrentTime() );
//             var totalTime = Math.floor( YTPlayer.player.getDuration() );
//             var timeW = ( currentTime * totW ) / totalTime;
//             var startLeft = 0;
//             var loadedW = YTPlayer.player.getVideoLoadedFraction() * 100;
//             loadedBar.css( {
//                 left: startLeft,
//                 width: loadedW + "%"
//             } );
//             timeBar.css( {
//                 left: 0,
//                 width: timeW
//             } );
//             return {
//                 totalTime: totalTime,
//                 currentTime: currentTime
//             };
//         },
//         /**
//          *
//          * @param YTPlayer
//          */
//         buildControls: function( YTPlayer ) {
//             var data = YTPlayer.opt;
//             // @data.printUrl: is deprecated; use data.showYTLogo
//             data.showYTLogo = data.showYTLogo || data.printUrl;
//             if( $J( "#controlBar_" + YTPlayer.id ).length ) return;
//             YTPlayer.controlBar = $J( "<span/>" ).attr( "id", "controlBar_" + YTPlayer.id ).addClass( "mb_YTPBar" ).css( {
//                 whiteSpace: "noWrap",
//                 position: YTPlayer.isBackground ? "fixed" : "absolute",
//                 zIndex: YTPlayer.isBackground ? 10000 : 1000
//             } ).hide();
//             var buttonBar = $J( "<div/>" ).addClass( "buttonBar" );
//             /* play/pause button*/
//             var playpause = $J( "<span>" + $J.mbYTPlayer.controls.play + "</span>" ).addClass( "mb_YTPPlaypause ytpicon" ).click( function() {
//                 if( YTPlayer.player.getPlayerState() == 1 ) $J( YTPlayer ).YTPPause();
//                 else $J( YTPlayer ).YTPPlay();
//             } );
//             /* mute/unmute button*/
//             var MuteUnmute = $J( "<span>" + $J.mbYTPlayer.controls.mute + "</span>" ).addClass( "mb_YTPMuteUnmute ytpicon" ).click( function() {
//                 if( YTPlayer.player.getVolume() == 0 ) {
//                     $J( YTPlayer ).YTPUnmute();
//                 } else {
//                     $J( YTPlayer ).YTPMute();
//                 }
//             } );
//             /* volume bar*/
//             var volumeBar = $J( "<div/>" ).addClass( "mb_YTPVolumeBar" ).css( {
//                 display: "inline-block"
//             } );
//             YTPlayer.volumeBar = volumeBar;
//             /* time elapsed */
//             var idx = $J( "<span/>" ).addClass( "mb_YTPTime" );
//             var vURL = data.videoURL ? data.videoURL : "";
//             if( vURL.indexOf( "http" ) < 0 ) vURL = $J.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL;
//             var movieUrl = $J( "<span/>" ).html( $J.mbYTPlayer.controls.ytLogo ).addClass( "mb_YTPUrl ytpicon" ).attr( "title", "view on YouTube" ).on( "click", function() {
//                 window.open( vURL, "viewOnYT" )
//             } );
//             var onlyVideo = $J( "<span/>" ).html( $J.mbYTPlayer.controls.onlyYT ).addClass( "mb_OnlyYT ytpicon" ).on( "click", function() {
//                 $J( YTPlayer ).YTPFullscreen( data.realfullscreen );
//             } );
//             var progressBar = $J( "<div/>" ).addClass( "mb_YTPProgress" ).css( "position", "absolute" ).click( function( e ) {
//                 timeBar.css( {
//                     width: ( e.clientX - timeBar.offset().left )
//                 } );
//                 YTPlayer.timeW = e.clientX - timeBar.offset().left;
//                 YTPlayer.controlBar.find( ".mb_YTPLoaded" ).css( {
//                     width: 0
//                 } );
//                 var totalTime = Math.floor( YTPlayer.player.getDuration() );
//                 YTPlayer.goto = ( timeBar.outerWidth() * totalTime ) / progressBar.outerWidth();
//                 YTPlayer.player.seekTo( parseFloat( YTPlayer.goto ), true );
//                 YTPlayer.controlBar.find( ".mb_YTPLoaded" ).css( {
//                     width: 0
//                 } );
//             } );
//             var loadedBar = $J( "<div/>" ).addClass( "mb_YTPLoaded" ).css( "position", "absolute" );
//             var timeBar = $J( "<div/>" ).addClass( "mb_YTPseekbar" ).css( "position", "absolute" );
//             progressBar.append( loadedBar ).append( timeBar );
//             buttonBar.append( playpause ).append( MuteUnmute ).append( volumeBar ).append( idx );
//             if( data.showYTLogo ) {
//                 buttonBar.append( movieUrl );
//             }
//             if( YTPlayer.isBackground || ( eval( YTPlayer.opt.realfullscreen ) && !YTPlayer.isBackground ) ) buttonBar.append( onlyVideo );
//             YTPlayer.controlBar.append( buttonBar ).append( progressBar );
//             if( !YTPlayer.isBackground ) {
//                 YTPlayer.controlBar.addClass( "inlinePlayer" );
//                 YTPlayer.wrapper.before( YTPlayer.controlBar );
//             } else {
//                 $J( "body" ).after( YTPlayer.controlBar );
//             }
//             volumeBar.simpleSlider( {
//                 initialval: YTPlayer.opt.vol,
//                 scale: 100,
//                 orientation: "h",
//                 callback: function( el ) {
//                     if( el.value == 0 ) {
//                         $J( YTPlayer ).YTPMute();
//                     } else {
//                         $J( YTPlayer ).YTPUnmute();
//                     }
//                     YTPlayer.player.setVolume( el.value );
//                     if( !YTPlayer.isMute ) YTPlayer.opt.vol = el.value;
//                 }
//             } );
//         },
//         /**
//          *
//          *
//          * */
//         checkForState: function( YTPlayer ) {
//             var interval = YTPlayer.opt.showControls ? 100 : 400;
//             clearInterval( YTPlayer.getState );
//             //Checking if player has been removed from scene
//             if( !$J.contains( document, YTPlayer ) ) {
//                 $J( YTPlayer ).YTPPlayerDestroy();
//                 clearInterval( YTPlayer.getState );
//                 clearInterval( YTPlayer.checkForStartAt );
//                 return;
//             }
//
//             $J.mbYTPlayer.checkForStart( YTPlayer );
//
//             YTPlayer.getState = setInterval( function() {
//                 var prog = $J( YTPlayer ).YTPManageProgress();
//                 var $YTPlayer = $J( YTPlayer );
//                 var data = YTPlayer.opt;
//                 var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
//                 var stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
//                 stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0;
//                 if( YTPlayer.player.time != prog.currentTime ) {
//                     var YTPEvent = $J.Event( "YTPTime" );
//                     YTPEvent.time = YTPlayer.player.time;
//                     $J( YTPlayer ).trigger( YTPEvent );
//                 }
//                 YTPlayer.player.time = prog.currentTime;
//                 if( YTPlayer.player.getVolume() == 0 ) $YTPlayer.addClass( "isMuted" );
//                 else $YTPlayer.removeClass( "isMuted" );
//
//                 if( YTPlayer.opt.showControls )
//                     if( prog.totalTime ) {
//                         YTPlayer.controlBar.find( ".mb_YTPTime" ).html( $J.mbYTPlayer.formatTime( prog.currentTime ) + " / " + $J.mbYTPlayer.formatTime( prog.totalTime ) );
//                     } else {
//                         YTPlayer.controlBar.find( ".mb_YTPTime" ).html( "-- : -- / -- : --" );
//                     }
//
//
//                 if( eval( YTPlayer.opt.stopMovieOnBlur ) )
//                     if( !document.hasFocus() ) {
//                         if( YTPlayer.state == 1 ) {
//                             YTPlayer.hasFocus = false;
//                             $YTPlayer.YTPPause();
//                         }
//                     } else if( document.hasFocus() && !YTPlayer.hasFocus && !( YTPlayer.state == -1 || YTPlayer.state == 0 ) ) {
//
//                         YTPlayer.hasFocus = true;
//                         $YTPlayer.YTPPlay();
//                     }
//
//                 if( YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ) {
//                     YTPlayer.controlBar.addClass( "compact" );
//                     YTPlayer.isCompact = true;
//                     if( !YTPlayer.isMute && YTPlayer.volumeBar ) YTPlayer.volumeBar.updateSliderVal( YTPlayer.opt.vol );
//                 } else if( YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact ) {
//                     YTPlayer.controlBar.removeClass( "compact" );
//                     YTPlayer.isCompact = false;
//                     if( !YTPlayer.isMute && YTPlayer.volumeBar ) YTPlayer.volumeBar.updateSliderVal( YTPlayer.opt.vol );
//                 }
//                 if( YTPlayer.player.getPlayerState() == 1 && ( parseFloat( YTPlayer.player.getDuration() - 1.5 ) < YTPlayer.player.getCurrentTime() || ( stopAt > 0 && parseFloat( YTPlayer.player.getCurrentTime() ) > stopAt ) ) ) {
//                     if( YTPlayer.isEnded ) return;
//                     YTPlayer.isEnded = true;
//                     setTimeout( function() {
//                         YTPlayer.isEnded = false
//                     }, 1000 );
//
//                     if( YTPlayer.isPlayList ) {
//
//                         if( !data.loop || ( data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1 ) ) {
//
//                             YTPlayer.player.loopTime = undefined;
//                             clearInterval( YTPlayer.getState );
//                             var YTPEnd = $J.Event( "YTPEnd" );
//                             YTPEnd.time = YTPlayer.player.time;
//                             $J( YTPlayer ).trigger( YTPEnd );
//                             YTPlayer.state = 0;
//
//                             return;
//                         }
//
//                     } else if( !data.loop || ( data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1 ) ) {
//
//                         YTPlayer.player.loopTime = undefined;
//                         YTPlayer.preventTrigger = true;
//                         $J( YTPlayer ).YTPPause();
//                         YTPlayer.state = 0;
//
//                         YTPlayer.wrapper.CSSAnimate( {
//                             opacity: 0
//                         }, 500, function() {
//
//                             if( YTPlayer.controlBar )
//                                 YTPlayer.controlBar.find( ".mb_YTPPlaypause" ).html( $J.mbYTPlayer.controls.play );
//
//                             var YTPEnd = $J.Event( "YTPEnd" );
//                             YTPEnd.time = YTPlayer.player.time;
//                             $J( YTPlayer ).trigger( YTPEnd );
//
//                             YTPlayer.player.seekTo( startAt, true );
//                             if( !YTPlayer.isBackground ) {
//                                 YTPlayer.opt.containment.css( {
//                                     background: "rgba(0,0,0,0.5) url(" + YTPlayer.opt.backgroundUrl + ") center center",
//                                     backgroundSize: "cover"
//                                 } );
//                             }
//                         } );
//
//                         return;
//
//                     }
//
//                     YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1;
//                     startAt = startAt || 1;
//                     YTPlayer.preventTrigger = true;
//                     $J( YTPlayer ).YTPPause();
//                     YTPlayer.player.seekTo( startAt, true );
//                     $YTPlayer.YTPPlay();
//
//
//                 }
//             }, interval );
//         },
//         /**
//          *
//          * */
//         checkForStart: function( YTPlayer ) {
//             var $YTPlayer = $J( YTPlayer );
//
//             //Checking if player has been removed from scene
//             if( !$J.contains( document, YTPlayer ) ) {
//                 $J( YTPlayer ).YTPPlayerDestroy();
//                 return
//             }
//
//             /*
// 			 if( $J.browser.chrome )
// 			 YTPlayer.opt.quality = "default";
// 			 */
//
//             YTPlayer.preventTrigger = true;
//             $J( YTPlayer ).YTPPause();
//
//             $J( YTPlayer ).muteYTPVolume();
//             $J( "#controlBar_" + YTPlayer.id ).remove();
//
//             if( YTPlayer.opt.showControls )
//                 $J.mbYTPlayer.buildControls( YTPlayer );
//
//             if( YTPlayer.opt.addRaster ) {
//
//                 var classN = YTPlayer.opt.addRaster == "dot" ? "raster-dot" : "raster";
//                 YTPlayer.overlay.addClass( YTPlayer.isRetina ? classN + " retina" : classN );
//
//             } else {
//
//                 YTPlayer.overlay.removeClass( function( index, classNames ) {
//                     // change the list into an array
//                     var current_classes = classNames.split( " " ),
//                         // array of classes which are to be removed
//                         classes_to_remove = [];
//                     $J.each( current_classes, function( index, class_name ) {
//                         // if the classname begins with bg add it to the classes_to_remove array
//                         if( /raster.*/.test( class_name ) ) {
//                             classes_to_remove.push( class_name );
//                         }
//                     } );
//                     classes_to_remove.push( "retina" );
//                     // turn the array back into a string
//                     return classes_to_remove.join( " " );
//                 } )
//
//             }
//
//             var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
//             YTPlayer.player.playVideo();
//             YTPlayer.player.seekTo( startAt, true );
//
//             YTPlayer.checkForStartAt = setInterval( function() {
//
//                 $J( YTPlayer ).YTPMute();
//
//                 var canPlayVideo = YTPlayer.player.getVideoLoadedFraction() >= startAt / YTPlayer.player.getDuration();
//
//                 if( YTPlayer.player.getDuration() > 0 && YTPlayer.player.getCurrentTime() >= startAt && canPlayVideo ) {
//
//                     //YTPlayer.player.playVideo();
//
//                     //console.timeEnd( "checkforStart" );
//
//                     //	console.debug( "checkForStartAt:: checked ::  ", YTPlayer );
//
//                     clearInterval( YTPlayer.checkForStartAt );
//
//                     YTPlayer.isReady = true;
//                     if( typeof YTPlayer.opt.onReady == "function" )
//                         YTPlayer.opt.onReady( YTPlayer );
//
//                     var YTPready = $J.Event( "YTPReady" );
//                     YTPready.time = YTPlayer.player.time;
//                     $J( YTPlayer ).trigger( YTPready );
//
//
//                     YTPlayer.preventTrigger = true;
//                     $J( YTPlayer ).YTPPause();
//
//                     if( !YTPlayer.opt.mute ) $J( YTPlayer ).YTPUnmute();
//                     YTPlayer.canTrigger = true;
//                     if( YTPlayer.opt.autoPlay ) {
//                         $YTPlayer.YTPPlay();
//
//                         var YTPStart = $J.Event( "YTPStart" );
//                         YTPStart.time = YTPlayer.player.time;
//                         $J( YTPlayer ).trigger( YTPStart );
//
//                         $YTPlayer.css( "background-image", "none" );
//                         $J( YTPlayer.playerEl ).CSSAnimate( {
//                             opacity: 1
//                         }, 1000 );
//                         YTPlayer.wrapper.CSSAnimate( {
//                             opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
//                         }, 1000 );
//                     } else {
//
//                         $YTPlayer.YTPPause();
//                         //YTPlayer.player.pauseVideo();
//                         if( !YTPlayer.isPlayer ) {
//                             $J( YTPlayer.playerEl ).CSSAnimate( {
//                                 opacity: 1
//                             }, 500 );
//
//                             YTPlayer.wrapper.CSSAnimate( {
//                                 opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
//                             }, 500 );
//                         }
//                     }
//
//                     if( YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ) {
//                         YTPlayer.loading.html( "Ready" );
//                         setTimeout( function() {
//                             YTPlayer.loading.fadeOut();
//                         }, 100 )
//                     }
//                     if( YTPlayer.controlBar ) YTPlayer.controlBar.slideDown( 1000 );
//
//                 } else if( $J.browser.safari ) {
//                     //YTPlayer.player.playVideo();
//                     //if( startAt >= 0 ) YTPlayer.player.seekTo( startAt, true );
//                 }
//
//             }, 1 );
//
//
//         },
//         /**
//          *
//          * @param s
//          * @returns {string}
//          */
//         formatTime: function( s ) {
//             var min = Math.floor( s / 60 );
//             var sec = Math.floor( s - ( 60 * min ) );
//             return( min <= 9 ? "0" + min : min ) + " : " + ( sec <= 9 ? "0" + sec : sec );
//         }
//     };
//     /**
//      *
//      * @returns {boolean}
//      */
//     $J.fn.toggleVolume = function() {
//         var YTPlayer = this.get( 0 );
//         if( !YTPlayer ) return;
//         if( YTPlayer.player.isMuted() ) {
//             $J( YTPlayer ).YTPUnmute();
//             return true;
//         } else {
//             $J( YTPlayer ).YTPMute();
//             return false;
//         }
//     };
//     /**
//      *
//      */
//     $J.fn.optimizeDisplay = function() {
//         var YTPlayer = this.get( 0 );
//         var data = YTPlayer.opt;
//         var playerBox = $J( YTPlayer.playerEl );
//         var vid = {};
//
//         if( data.optimizeDisplay ) {
//             var margin = 24;
//             var overprint = 100;
//             var win = {};
//             var el = YTPlayer.wrapper;
//             win.width = el.outerWidth();
//             win.height = el.outerHeight();
//             vid.width = win.width + ( ( win.width * margin ) / 100 );
//             vid.height = data.ratio == "16/9" ? Math.ceil( ( 9 * win.width ) / 16 ) : Math.ceil( ( 3 * win.width ) / 4 );
//             vid.marginTop = -( ( vid.height - win.height ) / 2 );
//             vid.marginLeft = -( ( win.width * ( margin / 2 ) ) / 100 );
//             if( vid.height < win.height ) {
//                 vid.height = win.height + ( ( win.height * margin ) / 100 );
//                 vid.width = data.ratio == "16/9" ? Math.floor( ( 16 * win.height ) / 9 ) : Math.floor( ( 4 * win.height ) / 3 );
//                 vid.marginTop = -( ( win.height * ( margin / 2 ) ) / 100 );
//                 vid.marginLeft = -( ( vid.width - win.width ) / 2 );
//             }
//             vid.width += overprint;
//             vid.height += overprint;
//             vid.marginTop -= overprint / 2;
//             vid.marginLeft -= overprint / 2;
//         } else {
//             vid.width = "100%";
//             vid.height = "100%";
//             vid.marginTop = 0;
//             vid.marginLeft = 0;
//         }
//
//         playerBox.css( {
//             width: vid.width,
//             height: vid.height,
//             marginTop: vid.marginTop,
//             marginLeft: vid.marginLeft
//         } );
//
//     };
//     /**
//      *
//      * @param arr
//      * @returns {Array|string|Blob|*}
//      *
//      */
//     $J.shuffle = function( arr ) {
//         var newArray = arr.slice();
//         var len = newArray.length;
//         var i = len;
//         while( i-- ) {
//             var p = parseInt( Math.random() * len );
//             var t = newArray[ i ];
//             newArray[ i ] = newArray[ p ];
//             newArray[ p ] = t;
//         }
//         return newArray;
//     };
//
//     $J.fn.unselectable = function() {
//         return this.each( function() {
//             $J( this ).css( {
//                 "-moz-user-select": "none",
//                 "-webkit-user-select": "none",
//                 "user-select": "none"
//             } ).attr( "unselectable", "on" );
//         } );
//     };
//
//
//     /* Exposed public method */
//     $J.fn.YTPlayer = $J.mbYTPlayer.buildPlayer;
//     $J.fn.YTPGetPlayer = $J.mbYTPlayer.getPlayer;
//     $J.fn.YTPGetVideoID = $J.mbYTPlayer.getVideoID;
//     $J.fn.YTPChangeMovie = $J.mbYTPlayer.changeMovie;
//     $J.fn.YTPPlayerDestroy = $J.mbYTPlayer.playerDestroy;
//
//     $J.fn.YTPPlay = $J.mbYTPlayer.play;
//     $J.fn.YTPTogglePlay = $J.mbYTPlayer.togglePlay;
//     $J.fn.YTPStop = $J.mbYTPlayer.stop;
//     $J.fn.YTPPause = $J.mbYTPlayer.pause;
//     $J.fn.YTPSeekTo = $J.mbYTPlayer.seekTo;
//
//     $J.fn.YTPlaylist = $J.mbYTPlayer.playlist;
//     $J.fn.YTPPlayNext = $J.mbYTPlayer.playNext;
//     $J.fn.YTPPlayPrev = $J.mbYTPlayer.playPrev;
//
//     $J.fn.YTPMute = $J.mbYTPlayer.mute;
//     $J.fn.YTPUnmute = $J.mbYTPlayer.unmute;
//     $J.fn.YTPToggleVolume = $J.mbYTPlayer.toggleVolume;
//     $J.fn.YTPSetVolume = $J.mbYTPlayer.setVolume;
//
//     $J.fn.YTPGetVideoData = $J.mbYTPlayer.getVideoData;
//     $J.fn.YTPFullscreen = $J.mbYTPlayer.fullscreen;
//     $J.fn.YTPToggleLoops = $J.mbYTPlayer.toggleLoops;
//     $J.fn.YTPSetVideoQuality = $J.mbYTPlayer.setVideoQuality;
//     $J.fn.YTPManageProgress = $J.mbYTPlayer.manageProgress;
//
//     $J.fn.YTPApplyFilter = $J.mbYTPlayer.applyFilter;
//     $J.fn.YTPApplyFilters = $J.mbYTPlayer.applyFilters;
//     $J.fn.YTPToggleFilter = $J.mbYTPlayer.toggleFilter;
//     $J.fn.YTPToggleFilters = $J.mbYTPlayer.toggleFilters;
//     $J.fn.YTPRemoveFilter = $J.mbYTPlayer.removeFilter;
//     $J.fn.YTPDisableFilters = $J.mbYTPlayer.disableFilters;
//     $J.fn.YTPEnableFilters = $J.mbYTPlayer.enableFilters;
//
//     $J.fn.YTPAddMask = $J.mbYTPlayer.addMask;
//     $J.fn.YTPRemoveMask = $J.mbYTPlayer.removeMask;
//
//
//     /**
//      *
//      * @deprecated
//      *
//      **/
//     $J.fn.mb_YTPlayer = $J.mbYTPlayer.buildPlayer;
//     $J.fn.playNext = $J.mbYTPlayer.playNext;
//     $J.fn.playPrev = $J.mbYTPlayer.playPrev;
//     $J.fn.changeMovie = $J.mbYTPlayer.changeMovie;
//     $J.fn.getVideoID = $J.mbYTPlayer.getVideoID;
//     $J.fn.getPlayer = $J.mbYTPlayer.getPlayer;
//     $J.fn.playerDestroy = $J.mbYTPlayer.playerDestroy;
//     $J.fn.fullscreen = $J.mbYTPlayer.fullscreen;
//     $J.fn.buildYTPControls = $J.mbYTPlayer.buildControls;
//     $J.fn.playYTP = $J.mbYTPlayer.play;
//     $J.fn.toggleLoops = $J.mbYTPlayer.toggleLoops;
//     $J.fn.stopYTP = $J.mbYTPlayer.stop;
//     $J.fn.pauseYTP = $J.mbYTPlayer.pause;
//     $J.fn.seekToYTP = $J.mbYTPlayer.seekTo;
//     $J.fn.muteYTPVolume = $J.mbYTPlayer.mute;
//     $J.fn.unmuteYTPVolume = $J.mbYTPlayer.unmute;
//     $J.fn.setYTPVolume = $J.mbYTPlayer.setVolume;
//     $J.fn.setVideoQuality = $J.mbYTPlayer.setVideoQuality;
//     $J.fn.manageYTPProgress = $J.mbYTPlayer.manageProgress;
//     $J.fn.YTPGetDataFromFeed = $J.mbYTPlayer.getVideoData;
//
//
// } )( $J, ytp );
// ;
// /*
//  * ******************************************************************************
//  *  jquery.mb.components
//  *  file: jquery.mb.CSSAnimate.min.js
//  *
//  *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
//  *  Open lab srl, Firenze - Italy
//  *  email: matteo@open-lab.com
//  *  site: 	http://pupunzi.com
//  *  blog:	http://pupunzi.open-lab.com
//  * 	http://open-lab.com
//  *
//  *  Licences: MIT, GPL
//  *  http://www.opensource.org/licenses/mit-license.php
//  *  http://www.gnu.org/licenses/gpl.html
//  *
//  *  last modified: 26/03/14 21.40
//  *  *****************************************************************************
//  */
//
// function uncamel(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function setUnit(a,b){return"string"!=typeof a||a.match(/^[\-0-9\.]+$J/)?""+a+b:a}function setFilter(a,b,c){var d=uncamel(b),e=$J.browser.mozilla?"":$J.CSS.sfx;a[e+"filter"]=a[e+"filter"]||"",c=setUnit(c>$J.CSS.filters[b].max?$J.CSS.filters[b].max:c,$J.CSS.filters[b].unit),a[e+"filter"]+=d+"("+c+") ",delete a[b]}$J.support.CSStransition=function(){var a=document.body||document.documentElement,b=a.style;return void 0!==b.transition||void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.MsTransition||void 0!==b.OTransition}(),$J.CSS={name:"mb.CSSAnimate",author:"Matteo Bicocchi",version:"2.0.0",transitionEnd:"transitionEnd",sfx:"",filters:{blur:{min:0,max:100,unit:"px"},brightness:{min:0,max:400,unit:"%"},contrast:{min:0,max:400,unit:"%"},grayscale:{min:0,max:100,unit:"%"},hueRotate:{min:0,max:360,unit:"deg"},invert:{min:0,max:100,unit:"%"},saturate:{min:0,max:400,unit:"%"},sepia:{min:0,max:100,unit:"%"}},normalizeCss:function(a){var b=$J.extend(!0,{},a);$J.browser.webkit||$J.browser.opera?$J.CSS.sfx="-webkit-":$J.browser.mozilla?$J.CSS.sfx="-moz-":$J.browser.msie&&($J.CSS.sfx="-ms-");for(var c in b){"transform"===c&&(b[$J.CSS.sfx+"transform"]=b[c],delete b[c]),"transform-origin"===c&&(b[$J.CSS.sfx+"transform-origin"]=a[c],delete b[c]),"filter"!==c||$J.browser.mozilla||(b[$J.CSS.sfx+"filter"]=a[c],delete b[c]),"blur"===c&&setFilter(b,"blur",a[c]),"brightness"===c&&setFilter(b,"brightness",a[c]),"contrast"===c&&setFilter(b,"contrast",a[c]),"grayscale"===c&&setFilter(b,"grayscale",a[c]),"hueRotate"===c&&setFilter(b,"hueRotate",a[c]),"invert"===c&&setFilter(b,"invert",a[c]),"saturate"===c&&setFilter(b,"saturate",a[c]),"sepia"===c&&setFilter(b,"sepia",a[c]);var d="";"x"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" translateX("+setUnit(a[c],"px")+")",delete b[c]),"y"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" translateY("+setUnit(a[c],"px")+")",delete b[c]),"z"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" translateZ("+setUnit(a[c],"px")+")",delete b[c]),"rotate"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotate("+setUnit(a[c],"deg")+")",delete b[c]),"rotateX"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotateX("+setUnit(a[c],"deg")+")",delete b[c]),"rotateY"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotateY("+setUnit(a[c],"deg")+")",delete b[c]),"rotateZ"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" rotateZ("+setUnit(a[c],"deg")+")",delete b[c]),"scale"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scale("+setUnit(a[c],"")+")",delete b[c]),"scaleX"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scaleX("+setUnit(a[c],"")+")",delete b[c]),"scaleY"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scaleY("+setUnit(a[c],"")+")",delete b[c]),"scaleZ"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" scaleZ("+setUnit(a[c],"")+")",delete b[c]),"skew"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" skew("+setUnit(a[c],"deg")+")",delete b[c]),"skewX"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" skewX("+setUnit(a[c],"deg")+")",delete b[c]),"skewY"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" skewY("+setUnit(a[c],"deg")+")",delete b[c]),"perspective"===c&&(d=$J.CSS.sfx+"transform",b[d]=b[d]||"",b[d]+=" perspective("+setUnit(a[c],"px")+")",delete b[c])}return b},getProp:function(a){var b=[];for(var c in a)b.indexOf(c)<0&&b.push(uncamel(c));return b.join(",")},animate:function(a,b,c,d,e){return this.each(function(){function o(){f.called=!0,f.CSSAIsRunning=!1,g.off($J.CSS.transitionEnd+"."+f.id),clearTimeout(f.timeout),g.css($J.CSS.sfx+"transition",""),"function"==typeof e&&e.apply(f),"function"==typeof f.CSSqueue&&(f.CSSqueue(),f.CSSqueue=null)}var f=this,g=$J(this);f.id=f.id||"CSSA_"+(new Date).getTime();var h=h||{type:"noEvent"};if(f.CSSAIsRunning&&f.eventType==h.type&&!$J.browser.msie&&$J.browser.version<=9)return f.CSSqueue=function(){g.CSSAnimate(a,b,c,d,e)},void 0;if(f.CSSqueue=null,f.eventType=h.type,0!==g.length&&a){if(a=$J.normalizeCss(a),f.CSSAIsRunning=!0,"function"==typeof b&&(e=b,b=$J.fx.speeds._default),"function"==typeof c&&(d=c,c=0),"string"==typeof c&&(e=c,c=0),"function"==typeof d&&(e=d,d="cubic-bezier(0.65,0.03,0.36,0.72)"),"string"==typeof b)for(var i in $J.fx.speeds){if(b==i){b=$J.fx.speeds[i];break}b=$J.fx.speeds._default}if(b||(b=$J.fx.speeds._default),"string"==typeof e&&(d=e,e=null),!$J.support.CSStransition){for(var j in a){if("transform"===j&&delete a[j],"filter"===j&&delete a[j],"transform-origin"===j&&delete a[j],"auto"===a[j]&&delete a[j],"x"===j){var k=a[j],l="left";a[l]=k,delete a[j]}if("y"===j){var k=a[j],l="top";a[l]=k,delete a[j]}("-ms-transform"===j||"-ms-filter"===j)&&delete a[j]}return g.delay(c).animate(a,b,e),void 0}var m={"default":"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};m[d]&&(d=m[d]),g.off($J.CSS.transitionEnd+"."+f.id);var n=$J.CSS.getProp(a),p={};$J.extend(p,a),p[$J.CSS.sfx+"transition-property"]=n,p[$J.CSS.sfx+"transition-duration"]=b+"ms",p[$J.CSS.sfx+"transition-delay"]=c+"ms",p[$J.CSS.sfx+"transition-timing-function"]=d,setTimeout(function(){g.one($J.CSS.transitionEnd+"."+f.id,o),g.css(p)},1),f.timeout=setTimeout(function(){return f.called||!e?(f.called=!1,f.CSSAIsRunning=!1,void 0):(g.css($J.CSS.sfx+"transition",""),e.apply(f),f.CSSAIsRunning=!1,"function"==typeof f.CSSqueue&&(f.CSSqueue(),f.CSSqueue=null),void 0)},b+c+10)}})}},$J.fn.CSSAnimate=$J.CSS.animate,$J.normalizeCss=$J.CSS.normalizeCss,$J.fn.css3=function(a){return this.each(function(){var b=$J(this),c=$J.normalizeCss(a);b.css(c)})};
// ;/*
//  * ******************************************************************************
//  *  jquery.mb.components
//  *  file: jquery.mb.browser.min.js
//  *
//  *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
//  *  Open lab srl, Firenze - Italy
//  *  email: matteo@open-lab.com
//  *  site: 	http://pupunzi.com
//  *  blog:	http://pupunzi.open-lab.com
//  * 	http://open-lab.com
//  *
//  *  Licences: MIT, GPL
//  *  http://www.opensource.org/licenses/mit-license.php
//  *  http://www.gnu.org/licenses/gpl.html
//  *
//  *  last modified: 26/03/14 21.43
//  *  *****************************************************************************
//  */
//
// var nAgt=navigator.userAgent;if(!$J.browser){$J.browser={},$J.browser.mozilla=!1,$J.browser.webkit=!1,$J.browser.opera=!1,$J.browser.safari=!1,$J.browser.chrome=!1,$J.browser.msie=!1,$J.browser.ua=nAgt,$J.browser.name=navigator.appName,$J.browser.fullVersion=""+parseFloat(navigator.appVersion),$J.browser.majorVersion=parseInt(navigator.appVersion,10);var nameOffset,verOffset,ix;if(-1!=(verOffset=nAgt.indexOf("Opera")))$J.browser.opera=!0,$J.browser.name="Opera",$J.browser.fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&($J.browser.fullVersion=nAgt.substring(verOffset+8));else if(-1!=(verOffset=nAgt.indexOf("OPR")))$J.browser.opera=!0,$J.browser.name="Opera",$J.browser.fullVersion=nAgt.substring(verOffset+4);else if(-1!=(verOffset=nAgt.indexOf("MSIE")))$J.browser.msie=!0,$J.browser.name="Microsoft Internet Explorer",$J.browser.fullVersion=nAgt.substring(verOffset+5);else if(-1!=nAgt.indexOf("Trident")){$J.browser.msie=!0,$J.browser.name="Microsoft Internet Explorer";var start=nAgt.indexOf("rv:")+3,end=start+4;$J.browser.fullVersion=nAgt.substring(start,end)}else-1!=(verOffset=nAgt.indexOf("Chrome"))?($J.browser.webkit=!0,$J.browser.chrome=!0,$J.browser.name="Chrome",$J.browser.fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))?($J.browser.webkit=!0,$J.browser.safari=!0,$J.browser.name="Safari",$J.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&($J.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("AppleWebkit"))?($J.browser.webkit=!0,$J.browser.name="Safari",$J.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&($J.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?($J.browser.mozilla=!0,$J.browser.name="Firefox",$J.browser.fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&($J.browser.name=nAgt.substring(nameOffset,verOffset),$J.browser.fullVersion=nAgt.substring(verOffset+1),$J.browser.name.toLowerCase()==$J.browser.name.toUpperCase()&&($J.browser.name=navigator.appName));-1!=(ix=$J.browser.fullVersion.indexOf(";"))&&($J.browser.fullVersion=$J.browser.fullVersion.substring(0,ix)),-1!=(ix=$J.browser.fullVersion.indexOf(" "))&&($J.browser.fullVersion=$J.browser.fullVersion.substring(0,ix)),$J.browser.majorVersion=parseInt(""+$J.browser.fullVersion,10),isNaN($J.browser.majorVersion)&&($J.browser.fullVersion=""+parseFloat(navigator.appVersion),$J.browser.majorVersion=parseInt(navigator.appVersion,10)),$J.browser.version=$J.browser.majorVersion}$J.browser.android=/Android/i.test(nAgt),$J.browser.blackberry=/BlackBerry|BB|PlayBook/i.test(nAgt),$J.browser.ios=/iPhone|iPad|iPod|webOS/i.test(nAgt),$J.browser.operaMobile=/Opera Mini/i.test(nAgt),$J.browser.windowsMobile=/IEMobile|Windows Phone/i.test(nAgt),$J.browser.kindle=/Kindle|Silk/i.test(nAgt),$J.browser.mobile=$J.browser.android||$J.browser.blackberry||$J.browser.ios||$J.browser.windowsMobile||$J.browser.operaMobile||$J.browser.kindle,$J.isMobile=$J.browser.mobile,$J.isTablet=$J.browser.mobile&&$J(window).width()>765,$J.isAndroidDefault=$J.browser.android&&!/chrome/i.test(nAgt);
// ;/*___________________________________________________________________________________________________________________________________________________
//  _ jquery.mb.components                                                                                                                             _
//  _                                                                                                                                                  _
//  _ file: jquery.mb.simpleSlider.min.js                                                                                                              _
//  _ last modified: 16/05/15 23.45                                                                                                                    _
//  _                                                                                                                                                  _
//  _ Open Lab s.r.l., Florence - Italy                                                                                                                _
//  _                                                                                                                                                  _
//  _ email: matteo@open-lab.com                                                                                                                       _
//  _ site: http://pupunzi.com                                                                                                                         _
//  _       http://open-lab.com                                                                                                                        _
//  _ blog: http://pupunzi.open-lab.com                                                                                                                _
//  _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
//  _                                                                                                                                                  _
//  _ Licences: MIT, GPL                                                                                                                               _
//  _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
//  _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
//  _                                                                                                                                                  _
//  _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
//  ___________________________________________________________________________________________________________________________________________________*/
//
// !function(a){/iphone|ipod|ipad|android|ie|blackberry|fennec/.test(navigator.userAgent.toLowerCase());var c="ontouchstart"in window||window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture||window.DocumentTouch&&document instanceof DocumentTouch||!1;a.simpleSlider={defaults:{initialval:0,scale:100,orientation:"h",readonly:!1,callback:!1},events:{start:c?"touchstart":"mousedown",end:c?"touchend":"mouseup",move:c?"touchmove":"mousemove"},init:function(b){return this.each(function(){var d=this,e=a(d);e.addClass("simpleSlider"),d.opt={},a.extend(d.opt,a.simpleSlider.defaults,b),a.extend(d.opt,e.data());var f="h"==d.opt.orientation?"horizontal":"vertical",g=a("<div/>").addClass("level").addClass(f);e.prepend(g),d.level=g,e.css({cursor:"default"}),"auto"==d.opt.scale&&(d.opt.scale=a(d).outerWidth()),e.updateSliderVal(),d.opt.readonly||(e.on(a.simpleSlider.events.start,function(a){c&&(a=a.changedTouches[0]),d.canSlide=!0,e.updateSliderVal(a),e.css({cursor:"col-resize"}),a.preventDefault(),a.stopPropagation()}),a(document).on(a.simpleSlider.events.move,function(b){c&&(b=b.changedTouches[0]),d.canSlide&&(a(document).css({cursor:"default"}),e.updateSliderVal(b),b.preventDefault(),b.stopPropagation())}).on(a.simpleSlider.events.end,function(){a(document).css({cursor:"auto"}),d.canSlide=!1,e.css({cursor:"auto"})}))})},updateSliderVal:function(b){function g(a,b){return Math.floor(100*a/b)}var c=this,d=c.get(0);d.opt.initialval="number"==typeof d.opt.initialval?d.opt.initialval:d.opt.initialval(d);var e=a(d).outerWidth(),f=a(d).outerHeight();d.x="object"==typeof b?b.clientX+document.body.scrollLeft-c.offset().left:"number"==typeof b?b*e/d.opt.scale:d.opt.initialval*e/d.opt.scale,d.y="object"==typeof b?b.clientY+document.body.scrollTop-c.offset().top:"number"==typeof b?(d.opt.scale-d.opt.initialval-b)*f/d.opt.scale:d.opt.initialval*f/d.opt.scale,d.y=c.outerHeight()-d.y,d.scaleX=d.x*d.opt.scale/e,d.scaleY=d.y*d.opt.scale/f,d.outOfRangeX=d.scaleX>d.opt.scale?d.scaleX-d.opt.scale:d.scaleX<0?d.scaleX:0,d.outOfRangeY=d.scaleY>d.opt.scale?d.scaleY-d.opt.scale:d.scaleY<0?d.scaleY:0,d.outOfRange="h"==d.opt.orientation?d.outOfRangeX:d.outOfRangeY,d.value="undefined"!=typeof b?"h"==d.opt.orientation?d.x>=c.outerWidth()?d.opt.scale:d.x<=0?0:d.scaleX:d.y>=c.outerHeight()?d.opt.scale:d.y<=0?0:d.scaleY:"h"==d.opt.orientation?d.scaleX:d.scaleY,"h"==d.opt.orientation?d.level.width(g(d.x,e)+"%"):d.level.height(g(d.y,f)),"function"==typeof d.opt.callback&&d.opt.callback(d)}},a.fn.simpleSlider=a.simpleSlider.init,a.fn.updateSliderVal=a.simpleSlider.updateSliderVal}($J);
// ;/*___________________________________________________________________________________________________________________________________________________
//  _ jquery.mb.components                                                                                                                             _
//  _                                                                                                                                                  _
//  _ file: jquery.mb.storage.min.js                                                                                                                   _
//  _ last modified: 24/05/15 16.08                                                                                                                    _
//  _                                                                                                                                                  _
//  _ Open Lab s.r.l., Florence - Italy                                                                                                                _
//  _                                                                                                                                                  _
//  _ email: matteo@open-lab.com                                                                                                                       _
//  _ site: http://pupunzi.com                                                                                                                         _
//  _       http://open-lab.com                                                                                                                        _
//  _ blog: http://pupunzi.open-lab.com                                                                                                                _
//  _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
//  _                                                                                                                                                  _
//  _ Licences: MIT, GPL                                                                                                                               _
//  _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
//  _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
//  _                                                                                                                                                  _
//  _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
//  ___________________________________________________________________________________________________________________________________________________*/
//
// !function(a){a.mbCookie={set:function(a,b,c,d){b=JSON.stringify(b),c||(c=7),d=d?"; domain="+d:"";var f,e=new Date;e.setTime(e.getTime()+1e3*60*60*24*c),f="; expires="+e.toGMTString(),document.cookie=a+"="+b+f+"; path=/"+d},get:function(a){for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(b))return JSON.parse(e.substring(b.length,e.length))}return null},remove:function(b){a.mbCookie.set(b,"",-1)}},a.mbStorage={set:function(a,b){b=JSON.stringify(b),localStorage.setItem(a,b)},get:function(a){return localStorage[a]?JSON.parse(localStorage[a]):null},remove:function(a){a?localStorage.removeItem(a):localStorage.clear()}}}($J);
//
// /**
//  * jquery.hoverdir.js v1.1.2
//  * http://www.codrops.com
//  *
//  * Licensed under the MIT license.
//  * http://www.opensource.org/licenses/mit-license.php
//  *
//  * Copyright 2012, Codrops
//  * http://www.codrops.com
//  */
// (function (factory) {
//     'use strict';
//     if (typeof define === 'function' && define.amd) {
//         define(['jquery'], factory);
//     } else if (typeof exports !== 'undefined') {
//         module.exports = factory(require('jquery'));
//     } else {
//         factory($J);
//     }
// })(function ($) {
//     'use strict';
//
//     function Hoverdir(element, options) {
//         this.$el = $(element);
//         // set options
//         this.options = $.extend(true, {}, this.defaults, options);
//         // initialize visibility to false for show and hide method
//         this.isVisible = false;
//         // get the hover for this element
//         this.$hoverElem = this.$el.find(this.options.hoverElem);
//         // transition properties
//         this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing;
//         // support for CSS transitions
//         this.support = this._supportsTransitions();
//         // load the events
//         this._loadEvents();
//     }
//
//     Hoverdir.prototype = {
//         defaults: {
//             speed: 300,
//             easing: 'ease',
//             hoverDelay: 0,
//             inverse: false,
//             hoverElem: 'div'
//         },
//         constructor: Hoverdir,
//         /**
//          * Detect if CSS transitions are supported
//          *
//          * @return {Boolean}
//          */
//         _supportsTransitions: function () {
//             if (typeof Modernizr !== 'undefined') {
//                 return Modernizr.csstransitions;
//             } else {
//                 var b = document.body || document.documentElement,
//                     s = b.style,
//                     p = 'transition';
//
//                 if (typeof s[p] === 'string') {
//                     return true;
//                 }
//
//                 // Tests for vendor specific prop
//                 var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
//                 p = p.charAt(0).toUpperCase() + p.substr(1);
//
//                 for (var i = 0; i < v.length; i++) {
//                     if (typeof s[v[i] + p] === 'string') {
//                         return true;
//                     }
//                 }
//
//                 return false;
//             }
//         },
//         /**
//          * Bind the events to the element
//          */
//         _loadEvents: function () {
//             this.$el.on('mouseenter.hoverdir mouseleave.hoverdir', $.proxy(function (event) {
//                 this.direction = this._getDir({x: event.pageX, y: event.pageY});
//
//                 if (event.type === 'mouseenter') {
//                     this._showHover();
//                 }
//                 else {
//                     this._hideHover();
//                 }
//             }, this));
//         },
//         /**
//          * Show the hover of the element
//          */
//         _showHover: function () {
//             var styleCSS = this._getStyle(this.direction);
//
//             if (this.support) {
//                 this.$hoverElem.css('transition', '');
//             }
//
//             this.$hoverElem.hide().css(styleCSS.from);
//             clearTimeout(this.tmhover);
//
//             this.tmhover = setTimeout($.proxy(function () {
//                 this.$hoverElem.show(0, $.proxy(function () {
//                     if (this.support) {
//                         this.$hoverElem.css('transition', this.transitionProp);
//                     }
//                     this._applyAnimation(styleCSS.to);
//
//                 }, this));
//             }, this), this.options.hoverDelay);
//
//             this.isVisible = true;
//         },
//         /**
//          * Hide the hover to the element
//          */
//         _hideHover: function () {
//             var styleCSS = this._getStyle(this.direction);
//             if (this.support) {
//                 this.$hoverElem.css('transition', this.transitionProp);
//             }
//             clearTimeout(this.tmhover);
//             this._applyAnimation(styleCSS.from);
//             this.isVisible = false;
//         },
//         /**
//          * get the direction when the event is triggered
//          * credits : http://stackoverflow.com/a/3647634
//          *
//          * @param {Object} coordinates
//          * @returns {Interger}
//          */
//         _getDir: function (coordinates) {
//             // the width and height of the current div
//             var w = this.$el.width(),
//                 h = this.$el.height(),
//                 // calculate the x and y to get an angle to the center of the div from that x and y.
//                 // gets the x value relative to the center of the DIV and "normalize" it
//                 x = (coordinates.x - this.$el.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
//                 y = (coordinates.y - this.$el.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
//                 // the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
//                 // first calculate the angle of the point,
//                 // add 180 deg to get rid of the negative values
//                 // divide by 90 to get the quadrant
//                 // add 3 and do a modulo by 4 to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
//                 direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
//             return direction;
//         },
//         /**
//          * get the style when the event is triggered
//          *
//          * @param {(Interger|String)} direction
//          * @returns {Object}
//          */
//         _getStyle: function (direction) {
//             var fromStyle, toStyle,
//                 slideFromTop = {'left': '0', 'top': '-100%'},
//                 slideFromBottom = {'left': '0', 'top': '100%'},
//                 slideFromLeft = {'left': '-100%', 'top': '0'},
//                 slideFromRight = {'left': '100%', 'top': '0'},
//                 slideTop = {'top': '0'},
//                 slideLeft = {'left': '0'};
//
//             switch (direction) {
//                 case 0:
//                 case 'top':
//                     // from top
//                     fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
//                     toStyle = slideTop;
//                     break;
//                 case 1:
//                 case 'right':
//                     // from right
//                     fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
//                     toStyle = slideLeft;
//                     break;
//                 case 2:
//                 case 'bottom':
//                     // from bottom
//                     fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
//                     toStyle = slideTop;
//                     break;
//                 case 3:
//                 case 'left':
//                     // from left
//                     fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
//                     toStyle = slideLeft;
//                     break;
//             }
//
//             return {from: fromStyle, to: toStyle};
//         },
//         /**
//          * Apply a transition or fallback to jquery animate based on Modernizr.csstransitions support
//          *
//          * @param {Object} styleCSS
//          */
//         _applyAnimation: function (styleCSS) {
//             $.fn.applyStyle = this.support ? $.fn.css : $.fn.animate;
//             this.$hoverElem.stop().applyStyle(styleCSS, $.extend(true, [], {duration: this.options.speed}));
//         },
//         /**
//          * Show $hoverElem from the direction in argument
//          *
//          * @param {String} [direction=top] direction
//          */
//         show: function (direction) {
//             this.$el.off('mouseenter.hoverdir mouseleave.hoverdir');
//             if (!this.isVisible) {
//                 this.direction = direction || 'top';
//                 this._showHover();
//             }
//         },
//         /**
//          * Hide $hoverElem from the direction in argument
//          *
//          * @param {String} [direction=bottom] direction
//          */
//         hide: function (direction) {
//             this.rebuild();
//             if (this.isVisible) {
//                 this.direction = direction || 'bottom';
//                 this._hideHover();
//             }
//         },
//         setOptions: function (options) {
//             this.options = $.extend(true, {}, this.defaults, this.options, options);
//         },
//         /**
//          * Unbinds the plugin.
//          */
//         destroy: function () {
//             this.$el.off('mouseenter.hoverdir mouseleave.hoverdir');
//             this.$el.data('hoverdir', null);
//         },
//         /**
//          * Bind the plugin.
//          */
//         rebuild: function (options) {
//             if (typeof options === 'object') {
//                 this.setOptions(options);
//             }
//             this._loadEvents();
//         }
//     };
//
//     $.fn.hoverdir = function (option, parameter) {
//         return this.each(function () {
//             var data = $(this).data('hoverdir');
//             var options = typeof option === 'object' && option;
//
//             // Initialize hoverdir.
//             if (!data) {
//                 data = new Hoverdir(this, options);
//                 $(this).data('hoverdir', data);
//             }
//
//             // Call hoverdir method.
//             if (typeof option === 'string') {
//                 data[option](parameter);
//
//                 if (option === 'destroy') {
//                     $(this).data('hoverdir', false);
//                 }
//             }
//         });
//     };
//
//     $.fn.hoverdir.Constructor = Hoverdir;
// });
// /*!
//  * jQuery Popup Overlay
//  *
//  * @version 1.7.10
//  * @requires jQuery v1.7.1+
//  * @link http://vast-engineering.github.com/jquery-popup-overlay/
//  */
// ;(function ($) {
//
//     var $window = $(window);
//     var options = {};
//     var zindexvalues = [];
//     var lastclicked = [];
//     var scrollbarwidth;
//     var bodymarginright = null;
//     var opensuffix = '_open';
//     var closesuffix = '_close';
//     var visiblePopupsArray = [];
//     var transitionsupport = null;
//     var opentimer;
//     var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
//     var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
//
//     var methods = {
//
//         _init: function (el) {
//             var $el = $(el);
//             var options = $el.data('popupoptions');
//             lastclicked[el.id] = false;
//             zindexvalues[el.id] = 0;
//
//             if (!$el.data('popup-initialized')) {
//                 $el.attr('data-popup-initialized', 'true');
//                 methods._initonce(el);
//             }
//
//             if (options.autoopen) {
//                 setTimeout(function() {
//                     methods.show(el, 0);
//                 }, 0);
//             }
//         },
//
//         _initonce: function (el) {
//             var $el = $(el);
//             var $body = $('body');
//             var $wrapper;
//             var options = $el.data('popupoptions');
//             var css;
//
//             bodymarginright = parseInt($body.css('margin-right'), 10);
//             transitionsupport = document.body.style.webkitTransition !== undefined ||
//                 document.body.style.MozTransition !== undefined ||
//                 document.body.style.msTransition !== undefined ||
//                 document.body.style.OTransition !== undefined ||
//                 document.body.style.transition !== undefined;
//
//             if (options.type == 'tooltip') {
//                 options.background = false;
//                 options.scrolllock = false;
//             }
//
//             if (options.backgroundactive) {
//                 options.background = false;
//                 options.blur = false;
//                 options.scrolllock = false;
//             }
//
//             if (options.scrolllock) {
//                 // Calculate the browser's scrollbar width dynamically
//                 var parent;
//                 var child;
//                 if (typeof scrollbarwidth === 'undefined') {
//                     parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
//                     child = parent.children();
//                     scrollbarwidth = child.innerWidth() - child.height(99).innerWidth();
//                     parent.remove();
//                 }
//             }
//
//             if (!$el.attr('id')) {
//                 $el.attr('id', 'j-popup-' + parseInt((Math.random() * 100000000), 10));
//             }
//
//             $el.addClass('popup_content');
//
//             $body.prepend(el);
//
//             $el.wrap('<div id="' + el.id + '_wrapper" class="popup_wrapper" />');
//
//             $wrapper = $('#' + el.id + '_wrapper');
//
//             $wrapper.css({
//                 opacity: 0,
//                 visibility: 'hidden',
//                 position: 'absolute'
//             });
//
//             // Make div clickable in iOS
//             if (iOS) {
//                 $wrapper.css('cursor', 'pointer');
//             }
//
//             if (options.type == 'overlay') {
//                 $wrapper.css('overflow','auto');
//             }
//
//             $el.css({
//                 opacity: 0,
//                 visibility: 'hidden',
//                 display: 'inline-block'
//             });
//
//             if (options.setzindex && !options.autozindex) {
//                 $wrapper.css('z-index', '100001');
//             }
//
//             if (!options.outline) {
//                 $el.css('outline', 'none');
//             }
//
//             if (options.transition) {
//                 $el.css('transition', options.transition);
//                 $wrapper.css('transition', options.transition);
//             }
//
//             // Hide popup content from screen readers initially
//             $el.attr('aria-hidden', true);
//
//             if ((options.background) && (!$('#' + el.id + '_background').length)) {
//
//                 $body.prepend('<div id="' + el.id + '_background" class="popup_background"></div>');
//
//                 var $background = $('#' + el.id + '_background');
//
//                 $background.css({
//                     opacity: 0,
//                     visibility: 'hidden',
//                     backgroundColor: options.color,
//                     position: 'fixed',
//                     top: 0,
//                     right: 0,
//                     bottom: 0,
//                     left: 0
//                 });
//
//                 if (options.setzindex && !options.autozindex) {
//                     $background.css('z-index', '100000');
//                 }
//
//                 if (options.transition) {
//                     $background.css('transition', options.transition);
//                 }
//             }
//
//             if (options.type == 'overlay') {
//                 $el.css({
//                     textAlign: 'left',
//                     position: 'relative',
//                     verticalAlign: 'middle'
//                 });
//
//                 css = {
//                     position: 'fixed',
//                     width: '100%',
//                     height: '100%',
//                     top: 0,
//                     left: 0,
//                     textAlign: 'center'
//                 };
//
//                 if(options.backgroundactive){
//                     css.position = 'relative';
//                     css.height = '0';
//                     css.overflow = 'visible';
//                 }
//
//                 $wrapper.css(css);
//
//                 // CSS vertical align helper
//                 $wrapper.append('<div class="popup_align" />');
//
//                 $('.popup_align').css({
//                     display: 'inline-block',
//                     verticalAlign: 'middle',
//                     height: '100%'
//                 });
//             }
//
//             // Add WAI ARIA role to announce dialog to screen readers
//             $el.attr('role', 'dialog');
//
//             var openelement =  (options.openelement) ? options.openelement : ('.' + el.id + opensuffix);
//
//             $(openelement).each(function (i, item) {
//                 $(item).attr('data-popup-ordinal', i);
//
//                 if (!item.id) {
//                     $(item).attr('id', 'open_' + parseInt((Math.random() * 100000000), 10));
//                 }
//             });
//
//             // Set aria-labelledby (if aria-label or aria-labelledby is not set in html)
//             if (!($el.attr('aria-labelledby') || $el.attr('aria-label'))) {
//                 $el.attr('aria-labelledby', $(openelement).attr('id'));
//             }
//
//             // Show and hide tooltips on hover
//             if(options.action == 'hover'){
//                 options.keepfocus = false;
//
//                 // Handler: mouseenter, focusin
//                 $(openelement).on('mouseenter', function (event) {
//                     methods.show(el, $(this).data('popup-ordinal'));
//                 });
//
//                 // Handler: mouseleave, focusout
//                 $(openelement).on('mouseleave', function (event) {
//                     methods.hide(el);
//                 });
//
//             } else {
//
//                 // Handler: Show popup when clicked on `open` element
//                 $(document).on('click', openelement, function (event) {
//                     event.preventDefault();
//
//                     var ord = $(this).data('popup-ordinal');
//                     setTimeout(function() { // setTimeout is to allow `close` method to finish (for issues with multiple tooltips)
//                         methods.show(el, ord);
//                     }, 0);
//                 });
//             }
//
//             if (options.closebutton) {
//                 methods.addclosebutton(el);
//             }
//
//             if (options.detach) {
//                 $el.hide().detach();
//             } else {
//                 $wrapper.hide();
//             }
//         },
//
//         /**
//          * Show method
//          *
//          * @param {object} el - popup instance DOM node
//          * @param {number} ordinal - order number of an `open` element
//          */
//         show: function (el, ordinal) {
//             var $el = $(el);
//
//             if ($el.data('popup-visible')) return;
//
//             // Initialize if not initialized. Required for: $('#popup').popup('show')
//             if (!$el.data('popup-initialized')) {
//                 methods._init(el);
//             }
//             $el.attr('data-popup-initialized', 'true');
//
//             var $body = $('body');
//             var options = $el.data('popupoptions');
//             var $wrapper = $('#' + el.id + '_wrapper');
//             var $background = $('#' + el.id + '_background');
//
//             // `beforeopen` callback event
//             callback(el, ordinal, options.beforeopen);
//
//             // Remember last clicked place
//             lastclicked[el.id] = ordinal;
//
//             // Add popup id to visiblePopupsArray
//             setTimeout(function() {
//                 visiblePopupsArray.push(el.id);
//             }, 0);
//
//             // Calculating maximum z-index
//             if (options.autozindex) {
//
//                 var elements = document.getElementsByTagName('*');
//                 var len = elements.length;
//                 var maxzindex = 0;
//
//                 for(var i=0; i<len; i++){
//
//                     var elementzindex = $(elements[i]).css('z-index');
//
//                     if(elementzindex !== 'auto'){
//
//                         elementzindex = parseInt(elementzindex, 10);
//
//                         if(maxzindex < elementzindex){
//                             maxzindex = elementzindex;
//                         }
//                     }
//                 }
//
//                 zindexvalues[el.id] = maxzindex;
//
//                 // Add z-index to the background
//                 if (options.background) {
//                     if (zindexvalues[el.id] > 0) {
//                         $('#' + el.id + '_background').css({
//                             zIndex: (zindexvalues[el.id] + 1)
//                         });
//                     }
//                 }
//
//                 // Add z-index to the wrapper
//                 if (zindexvalues[el.id] > 0) {
//                     $wrapper.css({
//                         zIndex: (zindexvalues[el.id] + 2)
//                     });
//                 }
//             }
//
//             if (options.detach) {
//                 $wrapper.prepend(el);
//                 $el.show();
//             } else {
//                 $wrapper.show();
//             }
//
//             opentimer = setTimeout(function() {
//                 $wrapper.css({
//                     visibility: 'visible',
//                     opacity: 1
//                 });
//
//                 $('html').addClass('popup_visible').addClass('popup_visible_' + el.id);
//                 $wrapper.addClass('popup_wrapper_visible');
//             }, 20); // 20ms required for opening animation to occur in FF
//
//             // Disable background layer scrolling when popup is opened
//             if (options.scrolllock) {
//                 $body.css('overflow', 'hidden');
//                 if ($body.height() > $window.height()) {
//                     $body.css('margin-right', bodymarginright + scrollbarwidth);
//                 }
//             }
//
//             if(options.backgroundactive){
//                 //calculates the vertical align
//                 $el.css({
//                     top:(
//                         $window.height() - (
//                             $el.get(0).offsetHeight +
//                             parseInt($el.css('margin-top'), 10) +
//                             parseInt($el.css('margin-bottom'), 10)
//                         )
//                     )/2 +'px'
//                 });
//             }
//
//             $el.css({
//                 'visibility': 'visible',
//                 'opacity': 1
//             });
//
//             // Show background
//             if (options.background) {
//                 $background.css({
//                     'visibility': 'visible',
//                     'opacity': options.opacity
//                 });
//
//                 // Fix IE8 issue with background not appearing
//                 setTimeout(function() {
//                     $background.css({
//                         'opacity': options.opacity
//                     });
//                 }, 0);
//             }
//
//             $el.data('popup-visible', true);
//
//             // Position popup
//             methods.reposition(el, ordinal);
//
//             // Remember which element had focus before opening a popup
//             $el.data('focusedelementbeforepopup', document.activeElement);
//
//             // Handler: Keep focus inside dialog box
//             if (options.keepfocus) {
//                 // Make holder div focusable
//                 $el.attr('tabindex', -1);
//
//                 // Focus popup or user specified element.
//                 // Initial timeout of 50ms is set to give some time to popup to show after clicking on
//                 // `open` element, and after animation is complete to prevent background scrolling.
//                 setTimeout(function() {
//                     if (options.focuselement === 'closebutton') {
//                         $('#' + el.id + ' .' + el.id + closesuffix + ':first').focus();
//                     } else if (options.focuselement) {
//                         $(options.focuselement).focus();
//                     } else {
//                         $el.focus();
//                     }
//                 }, options.focusdelay);
//
//             }
//
//             // Hide main content from screen readers
//             $(options.pagecontainer).attr('aria-hidden', true);
//
//             // Reveal popup content to screen readers
//             $el.attr('aria-hidden', false);
//
//             callback(el, ordinal, options.onopen);
//
//             if (transitionsupport) {
//                 $wrapper.one('transitionend', function() {
//                     callback(el, ordinal, options.opentransitionend);
//                 });
//             } else {
//                 callback(el, ordinal, options.opentransitionend);
//             }
//         },
//
//         /**
//          * Hide method
//          *
//          * @param object el - popup instance DOM node
//          * @param boolean outerClick - click on the outer content below popup
//          */
//         hide: function (el, outerClick) {
//             // Get index of popup ID inside of visiblePopupsArray
//             var popupIdIndex = $.inArray(el.id, visiblePopupsArray);
//
//             // If popup is not opened, ignore the rest of the function
//             if (popupIdIndex === -1) {
//                 return;
//             }
//
//             if(opentimer) clearTimeout(opentimer);
//
//             var $body = $('body');
//             var $el = $(el);
//             var options = $el.data('popupoptions');
//             var $wrapper = $('#' + el.id + '_wrapper');
//             var $background = $('#' + el.id + '_background');
//
//             $el.data('popup-visible', false);
//
//             if (visiblePopupsArray.length === 1) {
//                 $('html').removeClass('popup_visible').removeClass('popup_visible_' + el.id);
//             } else {
//                 if($('html').hasClass('popup_visible_' + el.id)) {
//                     $('html').removeClass('popup_visible_' + el.id);
//                 }
//             }
//
//             // Remove popup from the visiblePopupsArray
//             visiblePopupsArray.splice(popupIdIndex, 1);
//
//             if($wrapper.hasClass('popup_wrapper_visible')) {
//                 $wrapper.removeClass('popup_wrapper_visible');
//             }
//
//             // Focus back on saved element
//             if (options.keepfocus && !outerClick) {
//                 setTimeout(function() {
//                     if ($($el.data('focusedelementbeforepopup')).is(':visible')) {
//                         $el.data('focusedelementbeforepopup').focus();
//                     }
//                 }, 0);
//             }
//
//             // Hide popup
//             $wrapper.css({
//                 'visibility': 'hidden',
//                 'opacity': 0
//             });
//             $el.css({
//                 'visibility': 'hidden',
//                 'opacity': 0
//             });
//
//             // Hide background
//             if (options.background) {
//                 $background.css({
//                     'visibility': 'hidden',
//                     'opacity': 0
//                 });
//             }
//
//             // Reveal main content to screen readers
//             $(options.pagecontainer).attr('aria-hidden', false);
//
//             // Hide popup content from screen readers
//             $el.attr('aria-hidden', true);
//
//             // `onclose` callback event
//             callback(el, lastclicked[el.id], options.onclose);
//
//             if (transitionsupport && $el.css('transition-duration') !== '0s') {
//                 $el.one('transitionend', function(e) {
//
//                     if (!($el.data('popup-visible'))) {
//                         if (options.detach) {
//                             $el.hide().detach();
//                         } else {
//                             $wrapper.hide();
//                         }
//                     }
//
//                     // Re-enable scrolling of background layer
//                     if (options.scrolllock) {
//                         setTimeout(function() {
//                             $body.css({
//                                 overflow: 'visible',
//                                 'margin-right': bodymarginright
//                             });
//                         }, 10); // 10ms added for CSS transition in Firefox which doesn't like overflow:auto
//                     }
//
//                     callback(el, lastclicked[el.id], options.closetransitionend);
//                 });
//             } else {
//                 if (options.detach) {
//                     $el.hide().detach();
//                 } else {
//                     $wrapper.hide();
//                 }
//
//                 // Re-enable scrolling of background layer
//                 if (options.scrolllock) {
//                     setTimeout(function() {
//                         $body.css({
//                             overflow: 'visible',
//                             'margin-right': bodymarginright
//                         });
//                     }, 10); // 10ms added for CSS transition in Firefox which doesn't like overflow:auto
//                 }
//
//                 callback(el, lastclicked[el.id], options.closetransitionend);
//             }
//
//         },
//
//         /**
//          * Toggle method
//          *
//          * @param {object} el - popup instance DOM node
//          * @param {number} ordinal - order number of an `open` element
//          */
//         toggle: function (el, ordinal) {
//             if ($(el).data('popup-visible')) {
//                 methods.hide(el);
//             } else {
//                 setTimeout(function() {
//                     methods.show(el, ordinal);
//                 }, 0);
//             }
//         },
//
//         /**
//          * Reposition method
//          *
//          * @param {object} el - popup instance DOM node
//          * @param {number} ordinal - order number of an `open` element
//          */
//         reposition: function (el, ordinal) {
//             var $el = $(el);
//             var options = $el.data('popupoptions');
//             var $wrapper = $('#' + el.id + '_wrapper');
//             var $background = $('#' + el.id + '_background');
//
//             ordinal = ordinal || 0;
//
//             // Tooltip type
//             if (options.type == 'tooltip') {
//                 $wrapper.css({
//                     'position': 'absolute'
//                 });
//
//                 var $tooltipanchor;
//                 if (options.tooltipanchor) {
//                     $tooltipanchor = $(options.tooltipanchor);
//                 } else if (options.openelement) {
//                     $tooltipanchor = $(options.openelement).filter('[data-popup-ordinal="' + ordinal + '"]');
//                 } else {
//                     $tooltipanchor = $('.' + el.id + opensuffix + '[data-popup-ordinal="' + ordinal + '"]');
//                 }
//
//                 var linkOffset = $tooltipanchor.offset();
//
//                 // Horizontal position for tooltip
//                 if (options.horizontal == 'right') {
//                     $wrapper.css('left', linkOffset.left + $tooltipanchor.outerWidth() + options.offsetleft);
//                 } else if (options.horizontal == 'leftedge') {
//                     $wrapper.css('left', linkOffset.left + $tooltipanchor.outerWidth() - $tooltipanchor.outerWidth() +  options.offsetleft);
//                 } else if (options.horizontal == 'left') {
//                     $wrapper.css('right', $window.width() - linkOffset.left  - options.offsetleft);
//                 } else if (options.horizontal == 'rightedge') {
//                     $wrapper.css('right', $window.width()  - linkOffset.left - $tooltipanchor.outerWidth() - options.offsetleft);
//                 } else {
//                     $wrapper.css('left', linkOffset.left + ($tooltipanchor.outerWidth() / 2) - ($el.outerWidth() / 2) - parseFloat($el.css('marginLeft')) + options.offsetleft);
//                 }
//
//                 // Vertical position for tooltip
//                 if (options.vertical == 'bottom') {
//                     $wrapper.css('top', linkOffset.top + $tooltipanchor.outerHeight() + options.offsettop);
//                 } else if (options.vertical == 'bottomedge') {
//                     $wrapper.css('top', linkOffset.top + $tooltipanchor.outerHeight() - $el.outerHeight() + options.offsettop);
//                 } else if (options.vertical == 'top') {
//                     $wrapper.css('bottom', $window.height() - linkOffset.top - options.offsettop);
//                 } else if (options.vertical == 'topedge') {
//                     $wrapper.css('bottom', $window.height() - linkOffset.top - $el.outerHeight() - options.offsettop);
//                 } else {
//                     $wrapper.css('top', linkOffset.top + ($tooltipanchor.outerHeight() / 2) - ($el.outerHeight() / 2) - parseFloat($el.css('marginTop')) + options.offsettop);
//                 }
//
//                 // Overlay type
//             } else if (options.type == 'overlay') {
//
//                 // Horizontal position for overlay
//                 if (options.horizontal) {
//                     $wrapper.css('text-align', options.horizontal);
//                 } else {
//                     $wrapper.css('text-align', 'center');
//                 }
//
//                 // Vertical position for overlay
//                 if (options.vertical) {
//                     $el.css('vertical-align', options.vertical);
//                 } else {
//                     $el.css('vertical-align', 'middle');
//                 }
//             }
//         },
//
//         /**
//          * Add-close-button method
//          *
//          * @param {object} el - popup instance DOM node
//          */
//         addclosebutton: function (el) {
//             var genericCloseButton;
//
//             if ($(el).data('popupoptions').closebuttonmarkup) {
//                 genericCloseButton = $(options.closebuttonmarkup).addClass(el.id + '_close');
//             } else {
//                 genericCloseButton = '<button class="popup_close ' + el.id + '_close" title="Close" aria-label="Close"><span aria-hidden="true">×</span></button>';
//             }
//
//             if ($el.data('popup-initialized')){
//                 $el.append(genericCloseButton);
//             }
//
//         }
//
//     };
//
//     /**
//      * Callback event calls
//      *
//      * @param {object} el - popup instance DOM node
//      * @param {number} ordinal - order number of an `open` element
//      * @param {function} func - callback function
//      */
//     var callback = function (el, ordinal, func) {
//         var options = $(el).data('popupoptions');
//         var openelement =  (options.openelement) ? options.openelement : ('.' + el.id + opensuffix);
//         var elementclicked = $(openelement + '[data-popup-ordinal="' + ordinal + '"]');
//         if (typeof func == 'function') {
//             func.call($(el), el, elementclicked);
//         }
//     };
//
//     // Hide popup if ESC key is pressed
//     $(document).on('keydown', function (event) {
//         if(visiblePopupsArray.length) {
//             var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
//             var el = document.getElementById(elementId);
//
//             if ($(el).data('popupoptions').escape && event.keyCode == 27) {
//                 methods.hide(el);
//             }
//         }
//     });
//
//     // Hide popup on click
//     $(document).on('click', function (event) {
//         if(visiblePopupsArray.length) {
//             var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
//             var el = document.getElementById(elementId);
//             var closeButton = ($(el).data('popupoptions').closeelement) ? $(el).data('popupoptions').closeelement : ('.' + el.id + closesuffix);
//
//             // If Close button clicked
//             if ($(event.target).closest(closeButton).length) {
//                 event.preventDefault();
//                 methods.hide(el);
//             }
//
//             // If clicked outside of popup
//             if ($(el).data('popupoptions').blur && !$(event.target).closest('#' + elementId).length && event.which !== 2 && $(event.target).is(':visible')) {
//
//                 if ($(el).data('popupoptions').background) {
//                     // If clicked on popup cover
//                     methods.hide(el);
//
//                     // Older iOS/Safari will trigger a click on the elements below the cover,
//                     // when tapping on the cover, so the default action needs to be prevented.
//                     event.preventDefault();
//
//                 } else {
//                     // If clicked on outer content
//                     methods.hide(el, true);
//                 }
//             }
//         }
//     });
//
//     // Keep keyboard focus inside of popup
//     $(document).on('keydown', function(event) {
//         if(visiblePopupsArray.length && event.which == 9) {
//
//             // If tab or shift-tab pressed
//             var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
//             var el = document.getElementById(elementId);
//
//             // Get list of all children elements in given object
//             var popupItems = $(el).find('*');
//
//             // Get list of focusable items
//             var focusableItems = popupItems.filter(focusableElementsString).filter(':visible');
//
//             // Get currently focused item
//             var focusedItem = $(':focus');
//
//             // Get the number of focusable items
//             var numberOfFocusableItems = focusableItems.length;
//
//             // Get the index of the currently focused item
//             var focusedItemIndex = focusableItems.index(focusedItem);
//
//             // If popup doesn't contain focusable elements, focus popup itself
//             if (numberOfFocusableItems === 0) {
//                 $(el).focus();
//                 event.preventDefault();
//             } else {
//                 if (event.shiftKey) {
//                     // Back tab
//                     // If focused on first item and user preses back-tab, go to the last focusable item
//                     if (focusedItemIndex === 0) {
//                         focusableItems.get(numberOfFocusableItems - 1).focus();
//                         event.preventDefault();
//                     }
//
//                 } else {
//                     // Forward tab
//                     // If focused on the last item and user preses tab, go to the first focusable item
//                     if (focusedItemIndex == numberOfFocusableItems - 1) {
//                         focusableItems.get(0).focus();
//                         event.preventDefault();
//                     }
//                 }
//             }
//         }
//     });
//
//     /**
//      * Plugin API
//      */
//     $.fn.popup = function (customoptions) {
//         return this.each(function () {
//
//             var $el = $(this);
//
//             if (typeof customoptions === 'object') {  // e.g. $('#popup').popup({'color':'blue'})
//                 var opt = $.extend({}, $.fn.popup.defaults, customoptions, $el.data('popupoptions'));
//                 $el.data('popupoptions', opt);
//                 options = $el.data('popupoptions');
//
//                 methods._init(this);
//
//             } else if (typeof customoptions === 'string') { // e.g. $('#popup').popup('hide')
//                 if (!($el.data('popupoptions'))) {
//                     $el.data('popupoptions', $.fn.popup.defaults);
//                     options = $el.data('popupoptions');
//                 }
//
//                 methods[customoptions].call(this, this);
//
//             } else { // e.g. $('#popup').popup()
//                 if (!($el.data('popupoptions'))) {
//                     $el.data('popupoptions', $.fn.popup.defaults);
//                     options = $el.data('popupoptions');
//                 }
//
//                 methods._init(this);
//
//             }
//
//         });
//     };
//
//     $.fn.popup.defaults = {
//         type: 'overlay',
//         autoopen: false,
//         background: true,
//         backgroundactive: false,
//         color: 'black',
//         opacity: '0.5',
//         horizontal: 'center',
//         vertical: 'middle',
//         offsettop: 0,
//         offsetleft: 0,
//         escape: true,
//         blur: true,
//         setzindex: true,
//         autozindex: false,
//         scrolllock: false,
//         closebutton: false,
//         closebuttonmarkup: null,
//         keepfocus: true,
//         focuselement: null,
//         focusdelay: 50,
//         outline: false,
//         pagecontainer: null,
//         detach: false,
//         openelement: null,
//         closeelement: null,
//         transition: null,
//         tooltipanchor: null,
//         beforeopen: null,
//         onclose: null,
//         onopen: null,
//         opentransitionend: null,
//         closetransitionend: null
//     };
//
// })($J);
//
// /*
//  * $J Easing v1.3 - http://gsgd.co.uk/sandbox/$J/easing/
//  *
//  * Uses the built in easing capabilities added In $J 1.1
//  * to offer multiple easing options
//  *
//  * TERMS OF USE - $J Easing
//  *
//  * Open source under the BSD License.
//  *
//  * Copyright © 2008 George McGinley Smith
//  * All rights reserved.
//  *
//  * Redistribution and use in source and binary forms, with or without modification,
//  * are permitted provided that the following conditions are met:
//  *
//  * Redistributions of source code must retain the above copyright notice, this list of
//  * conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright notice, this list
//  * of conditions and the following disclaimer in the documentation and/or other materials
//  * provided with the distribution.
//  *
//  * Neither the name of the author nor the names of contributors may be used to endorse
//  * or promote products derived from this software without specific prior written permission.
//  *
//  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
//  * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
//  * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
//  *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
//  *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
//  *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
//  * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
//  * OF THE POSSIBILITY OF SUCH DAMAGE.
//  *
// */
//
// // t: current time, b: begInnIng value, c: change In value, d: duration
// $J.easing['jswing'] = $J.easing['swing'];
//
// $J.extend( $J.easing,
//     {
//         def: 'easeOutQuad',
//         swing: function (x, t, b, c, d) {
//             //alert($J.easing.default);
//             return $J.easing[$J.easing.def](x, t, b, c, d);
//         },
//         easeInQuad: function (x, t, b, c, d) {
//             return c*(t/=d)*t + b;
//         },
//         easeOutQuad: function (x, t, b, c, d) {
//             return -c *(t/=d)*(t-2) + b;
//         },
//         easeInOutQuad: function (x, t, b, c, d) {
//             if ((t/=d/2) < 1) return c/2*t*t + b;
//             return -c/2 * ((--t)*(t-2) - 1) + b;
//         },
//         easeInCubic: function (x, t, b, c, d) {
//             return c*(t/=d)*t*t + b;
//         },
//         easeOutCubic: function (x, t, b, c, d) {
//             return c*((t=t/d-1)*t*t + 1) + b;
//         },
//         easeInOutCubic: function (x, t, b, c, d) {
//             if ((t/=d/2) < 1) return c/2*t*t*t + b;
//             return c/2*((t-=2)*t*t + 2) + b;
//         },
//         easeInQuart: function (x, t, b, c, d) {
//             return c*(t/=d)*t*t*t + b;
//         },
//         easeOutQuart: function (x, t, b, c, d) {
//             return -c * ((t=t/d-1)*t*t*t - 1) + b;
//         },
//         easeInOutQuart: function (x, t, b, c, d) {
//             if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
//             return -c/2 * ((t-=2)*t*t*t - 2) + b;
//         },
//         easeInQuint: function (x, t, b, c, d) {
//             return c*(t/=d)*t*t*t*t + b;
//         },
//         easeOutQuint: function (x, t, b, c, d) {
//             return c*((t=t/d-1)*t*t*t*t + 1) + b;
//         },
//         easeInOutQuint: function (x, t, b, c, d) {
//             if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
//             return c/2*((t-=2)*t*t*t*t + 2) + b;
//         },
//         easeInSine: function (x, t, b, c, d) {
//             return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
//         },
//         easeOutSine: function (x, t, b, c, d) {
//             return c * Math.sin(t/d * (Math.PI/2)) + b;
//         },
//         easeInOutSine: function (x, t, b, c, d) {
//             return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
//         },
//         easeInExpo: function (x, t, b, c, d) {
//             return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
//         },
//         easeOutExpo: function (x, t, b, c, d) {
//             return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
//         },
//         easeInOutExpo: function (x, t, b, c, d) {
//             if (t==0) return b;
//             if (t==d) return b+c;
//             if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
//             return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
//         },
//         easeInCirc: function (x, t, b, c, d) {
//             return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
//         },
//         easeOutCirc: function (x, t, b, c, d) {
//             return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
//         },
//         easeInOutCirc: function (x, t, b, c, d) {
//             if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
//             return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
//         },
//         easeInElastic: function (x, t, b, c, d) {
//             var s=1.70158;var p=0;var a=c;
//             if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
//             if (a < Math.abs(c)) { a=c; var s=p/4; }
//             else var s = p/(2*Math.PI) * Math.asin (c/a);
//             return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
//         },
//         easeOutElastic: function (x, t, b, c, d) {
//             var s=1.70158;var p=0;var a=c;
//             if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
//             if (a < Math.abs(c)) { a=c; var s=p/4; }
//             else var s = p/(2*Math.PI) * Math.asin (c/a);
//             return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
//         },
//         easeInOutElastic: function (x, t, b, c, d) {
//             var s=1.70158;var p=0;var a=c;
//             if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
//             if (a < Math.abs(c)) { a=c; var s=p/4; }
//             else var s = p/(2*Math.PI) * Math.asin (c/a);
//             if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
//             return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
//         },
//         easeInBack: function (x, t, b, c, d, s) {
//             if (s == undefined) s = 1.70158;
//             return c*(t/=d)*t*((s+1)*t - s) + b;
//         },
//         easeOutBack: function (x, t, b, c, d, s) {
//             if (s == undefined) s = 1.70158;
//             return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
//         },
//         easeInOutBack: function (x, t, b, c, d, s) {
//             if (s == undefined) s = 1.70158;
//             if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
//             return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
//         },
//         easeInBounce: function (x, t, b, c, d) {
//             return c - $J.easing.easeOutBounce (x, d-t, 0, c, d) + b;
//         },
//         easeOutBounce: function (x, t, b, c, d) {
//             if ((t/=d) < (1/2.75)) {
//                 return c*(7.5625*t*t) + b;
//             } else if (t < (2/2.75)) {
//                 return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
//             } else if (t < (2.5/2.75)) {
//                 return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
//             } else {
//                 return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
//             }
//         },
//         easeInOutBounce: function (x, t, b, c, d) {
//             if (t < d/2) return $J.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
//             return $J.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
//         }
//     });
//
// /*
//  *
//  * TERMS OF USE - EASING EQUATIONS
//  *
//  * Open source under the BSD License.
//  *
//  * Copyright © 2001 Robert Penner
//  * All rights reserved.
//  *
//  * Redistribution and use in source and binary forms, with or without modification,
//  * are permitted provided that the following conditions are met:
//  *
//  * Redistributions of source code must retain the above copyright notice, this list of
//  * conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright notice, this list
//  * of conditions and the following disclaimer in the documentation and/or other materials
//  * provided with the distribution.
//  *
//  * Neither the name of the author nor the names of contributors may be used to endorse
//  * or promote products derived from this software without specific prior written permission.
//  *
//  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
//  * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
//  * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
//  *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
//  *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
//  *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
//  * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
//  * OF THE POSSIBILITY OF SUCH DAMAGE.
//  *
//  */
// /**
//  * bxSlider v4.2.4
//  * Copyright 2013-2015 Steven Wanderski
//  * Written while drinking Belgian ales and listening to jazz
//
//  * Licensed under MIT (http://opensource.org/licenses/MIT)
//  */
//
// ;(function($) {
//
//     var defaults = {
//
//         // GENERAL
//         mode: 'horizontal',
//         slideSelector: '',
//         infiniteLoop: true,
//         hideControlOnEnd: false,
//         speed: 500,
//         easing: null,
//         slideMargin: 0,
//         startSlide: 0,
//         randomStart: false,
//         captions: false,
//         ticker: false,
//         tickerHover: false,
//         adaptiveHeight: false,
//         adaptiveHeightSpeed: 500,
//         video: false,
//         useCSS: true,
//         preloadImages: 'visible',
//         responsive: true,
//         slideZIndex: 50,
//         wrapperClass: 'bx-wrapper',
//
//         // TOUCH
//         touchEnabled: true,
//         swipeThreshold: 50,
//         oneToOneTouch: true,
//         preventDefaultSwipeX: true,
//         preventDefaultSwipeY: false,
//
//         // ACCESSIBILITY
//         ariaLive: true,
//         ariaHidden: true,
//
//         // KEYBOARD
//         keyboardEnabled: false,
//
//         // PAGER
//         pager: true,
//         pagerType: 'full',
//         pagerShortSeparator: ' / ',
//         pagerSelector: null,
//         buildPager: null,
//         pagerCustom: null,
//
//         // CONTROLS
//         controls: true,
//         nextText: 'Next',
//         prevText: 'Prev',
//         nextSelector: null,
//         prevSelector: null,
//         autoControls: false,
//         startText: 'Start',
//         stopText: 'Stop',
//         autoControlsCombine: false,
//         autoControlsSelector: null,
//
//         // AUTO
//         auto: false,
//         pause: 4000,
//         autoStart: true,
//         autoDirection: 'next',
//         stopAutoOnClick: false,
//         autoHover: false,
//         autoDelay: 0,
//         autoSlideForOnePage: false,
//
//         // CAROUSEL
//         minSlides: 1,
//         maxSlides: 1,
//         moveSlides: 0,
//         slideWidth: 0,
//         shrinkItems: false,
//
//         // CALLBACKS
//         onSliderLoad: function() { return true; },
//         onSlideBefore: function() { return true; },
//         onSlideAfter: function() { return true; },
//         onSlideNext: function() { return true; },
//         onSlidePrev: function() { return true; },
//         onSliderResize: function() { return true; }
//     };
//
//     $.fn.bxSlider = function(options) {
//
//         if (this.length === 0) {
//             return this;
//         }
//
//         // support multiple elements
//         if (this.length > 1) {
//             this.each(function() {
//                 $(this).bxSlider(options);
//             });
//             return this;
//         }
//
//         // create a namespace to be used throughout the plugin
//         var slider = {},
//             // set a reference to our slider element
//             el = this,
//             // get the original window dimens (thanks a lot IE)
//             windowWidth = $(window).width(),
//             windowHeight = $(window).height();
//
//         // Return if slider is already initialized
//         if ($(el).data('bxSlider')) { return; }
//
//         /**
//          * ===================================================================================
//          * = PRIVATE FUNCTIONS
//          * ===================================================================================
//          */
//
//         /**
//          * Initializes namespace settings to be used throughout plugin
//          */
//         var init = function() {
//             // Return if slider is already initialized
//             if ($(el).data('bxSlider')) { return; }
//             // merge user-supplied options with the defaults
//             slider.settings = $.extend({}, defaults, options);
//             // parse slideWidth setting
//             slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
//             // store the original children
//             slider.children = el.children(slider.settings.slideSelector);
//             // check if actual number of slides is less than minSlides / maxSlides
//             if (slider.children.length < slider.settings.minSlides) { slider.settings.minSlides = slider.children.length; }
//             if (slider.children.length < slider.settings.maxSlides) { slider.settings.maxSlides = slider.children.length; }
//             // if random start, set the startSlide setting to random number
//             if (slider.settings.randomStart) { slider.settings.startSlide = Math.floor(Math.random() * slider.children.length); }
//             // store active slide information
//             slider.active = { index: slider.settings.startSlide };
//             // store if the slider is in carousel mode (displaying / moving multiple slides)
//             slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1 ? true : false;
//             // if carousel, force preloadImages = 'all'
//             if (slider.carousel) { slider.settings.preloadImages = 'all'; }
//             // calculate the min / max width thresholds based on min / max number of slides
//             // used to setup and update carousel slides dimensions
//             slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
//             slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
//             // store the current state of the slider (if currently animating, working is true)
//             slider.working = false;
//             // initialize the controls object
//             slider.controls = {};
//             // initialize an auto interval
//             slider.interval = null;
//             // determine which property to use for transitions
//             slider.animProp = slider.settings.mode === 'vertical' ? 'top' : 'left';
//             // determine if hardware acceleration can be used
//             slider.usingCSS = slider.settings.useCSS && slider.settings.mode !== 'fade' && (function() {
//                 // create our test div element
//                 var div = document.createElement('div'),
//                     // css transition properties
//                     props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
//                 // test for each property
//                 for (var i = 0; i < props.length; i++) {
//                     if (div.style[props[i]] !== undefined) {
//                         slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
//                         slider.animProp = '-' + slider.cssPrefix + '-transform';
//                         return true;
//                     }
//                 }
//                 return false;
//             }());
//             // if vertical mode always make maxSlides and minSlides equal
//             if (slider.settings.mode === 'vertical') { slider.settings.maxSlides = slider.settings.minSlides; }
//             // save original style data
//             el.data('origStyle', el.attr('style'));
//             el.children(slider.settings.slideSelector).each(function() {
//                 $(this).data('origStyle', $(this).attr('style'));
//             });
//
//             // perform all DOM / CSS modifications
//             setup();
//         };
//
//         /**
//          * Performs all DOM and CSS modifications
//          */
//         var setup = function() {
//             var preloadSelector = slider.children.eq(slider.settings.startSlide); // set the default preload selector (visible)
//
//             // wrap el in a wrapper
//             el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
//             // store a namespace reference to .bx-viewport
//             slider.viewport = el.parent();
//
//             // add aria-live if the setting is enabled and ticker mode is disabled
//             if (slider.settings.ariaLive && !slider.settings.ticker) {
//                 slider.viewport.attr('aria-live', 'polite');
//             }
//             // add a loading div to display while images are loading
//             slider.loader = $('<div class="bx-loading" />');
//             slider.viewport.prepend(slider.loader);
//             // set el to a massive width, to hold any needed slides
//             // also strip any margin and padding from el
//             el.css({
//                 width: slider.settings.mode === 'horizontal' ? (slider.children.length * 1000 + 215) + '%' : 'auto',
//                 position: 'relative'
//             });
//             // if using CSS, add the easing property
//             if (slider.usingCSS && slider.settings.easing) {
//                 el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
//                 // if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
//             } else if (!slider.settings.easing) {
//                 slider.settings.easing = 'swing';
//             }
//             // make modifications to the viewport (.bx-viewport)
//             slider.viewport.css({
//                 width: '100%',
//                 overflow: 'hidden',
//                 position: 'relative'
//             });
//             slider.viewport.parent().css({
//                 maxWidth: getViewportMaxWidth()
//             });
//             // make modification to the wrapper (.bx-wrapper)
//             if (!slider.settings.pager && !slider.settings.controls) {
//                 slider.viewport.parent().css({
//                     margin: '0 auto 0px'
//                 });
//             }
//             // apply css to all slider children
//             slider.children.css({
//                 float: slider.settings.mode === 'horizontal' ? 'left' : 'none',
//                 listStyle: 'none',
//                 position: 'relative'
//             });
//             // apply the calculated width after the float is applied to prevent scrollbar interference
//             slider.children.css('width', getSlideWidth());
//             // if slideMargin is supplied, add the css
//             if (slider.settings.mode === 'horizontal' && slider.settings.slideMargin > 0) { slider.children.css('marginRight', slider.settings.slideMargin); }
//             if (slider.settings.mode === 'vertical' && slider.settings.slideMargin > 0) { slider.children.css('marginBottom', slider.settings.slideMargin); }
//             // if "fade" mode, add positioning and z-index CSS
//             if (slider.settings.mode === 'fade') {
//                 slider.children.css({
//                     position: 'absolute',
//                     zIndex: 0,
//                     display: 'none'
//                 });
//                 // prepare the z-index on the showing element
//                 slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
//             }
//             // create an element to contain all slider controls (pager, start / stop, etc)
//             slider.controls.el = $('<div class="bx-controls" />');
//             // if captions are requested, add them
//             if (slider.settings.captions) { appendCaptions(); }
//             // check if startSlide is last slide
//             slider.active.last = slider.settings.startSlide === getPagerQty() - 1;
//             // if video is true, set up the fitVids plugin
//             if (slider.settings.video) { el.fitVids(); }
//             if (slider.settings.preloadImages === 'all' || slider.settings.ticker) { preloadSelector = slider.children; }
//             // only check for control addition if not in "ticker" mode
//             if (!slider.settings.ticker) {
//                 // if controls are requested, add them
//                 if (slider.settings.controls) { appendControls(); }
//                 // if auto is true, and auto controls are requested, add them
//                 if (slider.settings.auto && slider.settings.autoControls) { appendControlsAuto(); }
//                 // if pager is requested, add it
//                 if (slider.settings.pager) { appendPager(); }
//                 // if any control option is requested, add the controls wrapper
//                 if (slider.settings.controls || slider.settings.autoControls || slider.settings.pager) { slider.viewport.after(slider.controls.el); }
//                 // if ticker mode, do not allow a pager
//             } else {
//                 slider.settings.pager = false;
//             }
//             loadElements(preloadSelector, start);
//         };
//
//         var loadElements = function(selector, callback) {
//             var total = selector.find('img:not([src=""]), iframe').length,
//                 count = 0;
//             if (total === 0) {
//                 callback();
//                 return;
//             }
//             selector.find('img:not([src=""]), iframe').each(function() {
//                 $(this).one('load error', function() {
//                     if (++count === total) { callback(); }
//                 }).each(function() {
//                     if (this.complete) { $(this).load(); }
//                 });
//             });
//         };
//
//         /**
//          * Start the slider
//          */
//         var start = function() {
//             // if infinite loop, prepare additional slides
//             if (slider.settings.infiniteLoop && slider.settings.mode !== 'fade' && !slider.settings.ticker) {
//                 var slice    = slider.settings.mode === 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides,
//                     sliceAppend  = slider.children.slice(0, slice).clone(true).addClass('bx-clone'),
//                     slicePrepend = slider.children.slice(-slice).clone(true).addClass('bx-clone');
//                 if (slider.settings.ariaHidden) {
//                     sliceAppend.attr('aria-hidden', true);
//                     slicePrepend.attr('aria-hidden', true);
//                 }
//                 el.append(sliceAppend).prepend(slicePrepend);
//             }
//             // remove the loading DOM element
//             slider.loader.remove();
//             // set the left / top position of "el"
//             setSlidePosition();
//             // if "vertical" mode, always use adaptiveHeight to prevent odd behavior
//             if (slider.settings.mode === 'vertical') { slider.settings.adaptiveHeight = true; }
//             // set the viewport height
//             slider.viewport.height(getViewportHeight());
//             // make sure everything is positioned just right (same as a window resize)
//             el.redrawSlider();
//             // onSliderLoad callback
//             slider.settings.onSliderLoad.call(el, slider.active.index);
//             // slider has been fully initialized
//             slider.initialized = true;
//             // bind the resize call to the window
//             if (slider.settings.responsive) { $(window).bind('resize', resizeWindow); }
//             // if auto is true and has more than 1 page, start the show
//             if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) { initAuto(); }
//             // if ticker is true, start the ticker
//             if (slider.settings.ticker) { initTicker(); }
//             // if pager is requested, make the appropriate pager link active
//             if (slider.settings.pager) { updatePagerActive(slider.settings.startSlide); }
//             // check for any updates to the controls (like hideControlOnEnd updates)
//             if (slider.settings.controls) { updateDirectionControls(); }
//             // if touchEnabled is true, setup the touch events
//             if (slider.settings.touchEnabled && !slider.settings.ticker) { initTouch(); }
//             // if keyboardEnabled is true, setup the keyboard events
//             if (slider.settings.keyboardEnabled && !slider.settings.ticker) {
//                 $(document).keydown(keyPress);
//             }
//         };
//
//         /**
//          * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
//          */
//         var getViewportHeight = function() {
//             var height = el.outerHeight(),
//                 currentIndex = null,
//                 // first determine which children (slides) should be used in our height calculation
//                 children = $();
//             // if mode is not "vertical" and adaptiveHeight is false, include all children
//             if (slider.settings.mode !== 'vertical' && !slider.settings.adaptiveHeight) {
//                 children = slider.children;
//             } else {
//                 // if not carousel, return the single active child
//                 if (!slider.carousel) {
//                     children = slider.children.eq(slider.active.index);
//                     // if carousel, return a slice of children
//                 } else {
//                     // get the individual slide index
//                     currentIndex = slider.settings.moveSlides === 1 ? slider.active.index : slider.active.index * getMoveBy();
//                     // add the current slide to the children
//                     children = slider.children.eq(currentIndex);
//                     // cycle through the remaining "showing" slides
//                     for (var i = 1; i <= slider.settings.maxSlides - 1; i++) {
//                         // if looped back to the start
//                         if (currentIndex + i >= slider.children.length) {
//                             children = children.add(slider.children.eq(currentIndex + i - slider.children.length));
//                         } else {
//                             children = children.add(slider.children.eq(currentIndex + i));
//                         }
//                     }
//                 }
//             }
//             // if "vertical" mode, calculate the sum of the heights of the children
//             if (slider.settings.mode === 'vertical') {
//                 children.each(function(index) {
//                     height += $(this).outerHeight();
//                 });
//                 // add user-supplied margins
//                 if (slider.settings.slideMargin > 0) {
//                     height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
//                 }
//                 // if not "vertical" mode, calculate the max height of the children
//             } else {
//                 height = Math.max.apply(Math, children.map(function() {
//                     return $(this).outerHeight(false);
//                 }).get());
//             }
//
//             if (slider.viewport.css('box-sizing') === 'border-box') {
//                 height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
//                     parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
//             } else if (slider.viewport.css('box-sizing') === 'padding-box') {
//                 height += parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
//             }
//
//             return height;
//         };
//
//         /**
//          * Returns the calculated width to be used for the outer wrapper / viewport
//          */
//         var getViewportMaxWidth = function() {
//             var width = '100%';
//             if (slider.settings.slideWidth > 0) {
//                 if (slider.settings.mode === 'horizontal') {
//                     width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
//                 } else {
//                     width = slider.settings.slideWidth;
//                 }
//             }
//             return width;
//         };
//
//         /**
//          * Returns the calculated width to be applied to each slide
//          */
//         var getSlideWidth = function() {
//             var newElWidth = slider.settings.slideWidth, // start with any user-supplied slide width
//                 wrapWidth      = slider.viewport.width();    // get the current viewport width
//             // if slide width was not supplied, or is larger than the viewport use the viewport width
//             if (slider.settings.slideWidth === 0 ||
//                 (slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
//                 slider.settings.mode === 'vertical') {
//                 newElWidth = wrapWidth;
//                 // if carousel, use the thresholds to determine the width
//             } else if (slider.settings.maxSlides > 1 && slider.settings.mode === 'horizontal') {
//                 if (wrapWidth > slider.maxThreshold) {
//                     return newElWidth;
//                 } else if (wrapWidth < slider.minThreshold) {
//                     newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
//                 } else if (slider.settings.shrinkItems) {
//                     newElWidth = Math.floor((wrapWidth + slider.settings.slideMargin) / (Math.ceil((wrapWidth + slider.settings.slideMargin) / (newElWidth + slider.settings.slideMargin))) - slider.settings.slideMargin);
//                 }
//             }
//             return newElWidth;
//         };
//
//         /**
//          * Returns the number of slides currently visible in the viewport (includes partially visible slides)
//          */
//         var getNumberSlidesShowing = function() {
//             var slidesShowing = 1,
//                 childWidth = null;
//             if (slider.settings.mode === 'horizontal' && slider.settings.slideWidth > 0) {
//                 // if viewport is smaller than minThreshold, return minSlides
//                 if (slider.viewport.width() < slider.minThreshold) {
//                     slidesShowing = slider.settings.minSlides;
//                     // if viewport is larger than maxThreshold, return maxSlides
//                 } else if (slider.viewport.width() > slider.maxThreshold) {
//                     slidesShowing = slider.settings.maxSlides;
//                     // if viewport is between min / max thresholds, divide viewport width by first child width
//                 } else {
//                     childWidth = slider.children.first().width() + slider.settings.slideMargin;
//                     slidesShowing = Math.floor((slider.viewport.width() +
//                         slider.settings.slideMargin) / childWidth);
//                 }
//                 // if "vertical" mode, slides showing will always be minSlides
//             } else if (slider.settings.mode === 'vertical') {
//                 slidesShowing = slider.settings.minSlides;
//             }
//             return slidesShowing;
//         };
//
//         /**
//          * Returns the number of pages (one full viewport of slides is one "page")
//          */
//         var getPagerQty = function() {
//             var pagerQty = 0,
//                 breakPoint = 0,
//                 counter = 0;
//             // if moveSlides is specified by the user
//             if (slider.settings.moveSlides > 0) {
//                 if (slider.settings.infiniteLoop) {
//                     pagerQty = Math.ceil(slider.children.length / getMoveBy());
//                 } else {
//                     // when breakpoint goes above children length, counter is the number of pages
//                     while (breakPoint < slider.children.length) {
//                         ++pagerQty;
//                         breakPoint = counter + getNumberSlidesShowing();
//                         counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
//                     }
//                 }
//                 // if moveSlides is 0 (auto) divide children length by sides showing, then round up
//             } else {
//                 pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
//             }
//             return pagerQty;
//         };
//
//         /**
//          * Returns the number of individual slides by which to shift the slider
//          */
//         var getMoveBy = function() {
//             // if moveSlides was set by the user and moveSlides is less than number of slides showing
//             if (slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()) {
//                 return slider.settings.moveSlides;
//             }
//             // if moveSlides is 0 (auto)
//             return getNumberSlidesShowing();
//         };
//
//         /**
//          * Sets the slider's (el) left or top position
//          */
//         var setSlidePosition = function() {
//             var position, lastChild, lastShowingIndex;
//             // if last slide, not infinite loop, and number of children is larger than specified maxSlides
//             if (slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop) {
//                 if (slider.settings.mode === 'horizontal') {
//                     // get the last child's position
//                     lastChild = slider.children.last();
//                     position = lastChild.position();
//                     // set the left position
//                     setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
//                 } else if (slider.settings.mode === 'vertical') {
//                     // get the last showing index's position
//                     lastShowingIndex = slider.children.length - slider.settings.minSlides;
//                     position = slider.children.eq(lastShowingIndex).position();
//                     // set the top position
//                     setPositionProperty(-position.top, 'reset', 0);
//                 }
//                 // if not last slide
//             } else {
//                 // get the position of the first showing slide
//                 position = slider.children.eq(slider.active.index * getMoveBy()).position();
//                 // check for last slide
//                 if (slider.active.index === getPagerQty() - 1) { slider.active.last = true; }
//                 // set the respective position
//                 if (position !== undefined) {
//                     if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
//                     else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
//                 }
//             }
//         };
//
//         /**
//          * Sets the el's animating property position (which in turn will sometimes animate el).
//          * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
//          *
//          * @param value (int)
//          *  - the animating property's value
//          *
//          * @param type (string) 'slide', 'reset', 'ticker'
//          *  - the type of instance for which the function is being
//          *
//          * @param duration (int)
//          *  - the amount of time (in ms) the transition should occupy
//          *
//          * @param params (array) optional
//          *  - an optional parameter containing any variables that need to be passed in
//          */
//         var setPositionProperty = function(value, type, duration, params) {
//             var animateObj, propValue;
//             // use CSS transform
//             if (slider.usingCSS) {
//                 // determine the translate3d value
//                 propValue = slider.settings.mode === 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
//                 // add the CSS transition-duration
//                 el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
//                 if (type === 'slide') {
//                     // set the property value
//                     el.css(slider.animProp, propValue);
//                     // bind a callback method - executes when CSS transition completes
//                     el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
//                         //make sure it's the correct one
//                         if (!$(e.target).is(el)) { return; }
//                         // unbind the callback
//                         el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
//                         updateAfterSlideTransition();
//                     });
//                 } else if (type === 'reset') {
//                     el.css(slider.animProp, propValue);
//                 } else if (type === 'ticker') {
//                     // make the transition use 'linear'
//                     el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
//                     el.css(slider.animProp, propValue);
//                     // bind a callback method - executes when CSS transition completes
//                     el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
//                         //make sure it's the correct one
//                         if (!$(e.target).is(el)) { return; }
//                         // unbind the callback
//                         el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
//                         // reset the position
//                         setPositionProperty(params.resetValue, 'reset', 0);
//                         // start the loop again
//                         tickerLoop();
//                     });
//                 }
//                 // use JS animate
//             } else {
//                 animateObj = {};
//                 animateObj[slider.animProp] = value;
//                 if (type === 'slide') {
//                     el.animate(animateObj, duration, slider.settings.easing, function() {
//                         updateAfterSlideTransition();
//                     });
//                 } else if (type === 'reset') {
//                     el.css(slider.animProp, value);
//                 } else if (type === 'ticker') {
//                     el.animate(animateObj, duration, 'linear', function() {
//                         setPositionProperty(params.resetValue, 'reset', 0);
//                         // run the recursive loop after animation
//                         tickerLoop();
//                     });
//                 }
//             }
//         };
//
//         /**
//          * Populates the pager with proper amount of pages
//          */
//         var populatePager = function() {
//             var pagerHtml = '',
//                 linkContent = '',
//                 pagerQty = getPagerQty();
//             // loop through each pager item
//             for (var i = 0; i < pagerQty; i++) {
//                 linkContent = '';
//                 // if a buildPager function is supplied, use it to get pager link value, else use index + 1
//                 if (slider.settings.buildPager && $.isFunction(slider.settings.buildPager) || slider.settings.pagerCustom) {
//                     linkContent = slider.settings.buildPager(i);
//                     slider.pagerEl.addClass('bx-custom-pager');
//                 } else {
//                     linkContent = i + 1;
//                     slider.pagerEl.addClass('bx-default-pager');
//                 }
//                 // var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
//                 // add the markup to the string
//                 pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
//             }
//             // populate the pager element with pager links
//             slider.pagerEl.html(pagerHtml);
//         };
//
//         /**
//          * Appends the pager to the controls element
//          */
//         var appendPager = function() {
//             if (!slider.settings.pagerCustom) {
//                 // create the pager DOM element
//                 slider.pagerEl = $('<div class="bx-pager" />');
//                 // if a pager selector was supplied, populate it with the pager
//                 if (slider.settings.pagerSelector) {
//                     $(slider.settings.pagerSelector).html(slider.pagerEl);
//                     // if no pager selector was supplied, add it after the wrapper
//                 } else {
//                     slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
//                 }
//                 // populate the pager
//                 populatePager();
//             } else {
//                 slider.pagerEl = $(slider.settings.pagerCustom);
//             }
//             // assign the pager click binding
//             slider.pagerEl.on('click touchend', 'a', clickPagerBind);
//         };
//
//         /**
//          * Appends prev / next controls to the controls element
//          */
//         var appendControls = function() {
//             slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
//             slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
//             // bind click actions to the controls
//             slider.controls.next.bind('click touchend', clickNextBind);
//             slider.controls.prev.bind('click touchend', clickPrevBind);
//             // if nextSelector was supplied, populate it
//             if (slider.settings.nextSelector) {
//                 $(slider.settings.nextSelector).append(slider.controls.next);
//             }
//             // if prevSelector was supplied, populate it
//             if (slider.settings.prevSelector) {
//                 $(slider.settings.prevSelector).append(slider.controls.prev);
//             }
//             // if no custom selectors were supplied
//             if (!slider.settings.nextSelector && !slider.settings.prevSelector) {
//                 // add the controls to the DOM
//                 slider.controls.directionEl = $('<div class="bx-controls-direction" />');
//                 // add the control elements to the directionEl
//                 slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
//                 // slider.viewport.append(slider.controls.directionEl);
//                 slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
//             }
//         };
//
//         /**
//          * Appends start / stop auto controls to the controls element
//          */
//         var appendControlsAuto = function() {
//             slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
//             slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
//             // add the controls to the DOM
//             slider.controls.autoEl = $('<div class="bx-controls-auto" />');
//             // bind click actions to the controls
//             slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
//             slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
//             // if autoControlsCombine, insert only the "start" control
//             if (slider.settings.autoControlsCombine) {
//                 slider.controls.autoEl.append(slider.controls.start);
//                 // if autoControlsCombine is false, insert both controls
//             } else {
//                 slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
//             }
//             // if auto controls selector was supplied, populate it with the controls
//             if (slider.settings.autoControlsSelector) {
//                 $(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
//                 // if auto controls selector was not supplied, add it after the wrapper
//             } else {
//                 slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
//             }
//             // update the auto controls
//             updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
//         };
//
//         /**
//          * Appends image captions to the DOM
//          */
//         var appendCaptions = function() {
//             // cycle through each child
//             slider.children.each(function(index) {
//                 // get the image title attribute
//                 var title = $(this).find('img:first').attr('title');
//                 // append the caption
//                 if (title !== undefined && ('' + title).length) {
//                     $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
//                 }
//             });
//         };
//
//         /**
//          * Click next binding
//          *
//          * @param e (event)
//          *  - DOM event object
//          */
//         var clickNextBind = function(e) {
//             e.preventDefault();
//             if (slider.controls.el.hasClass('disabled')) { return; }
//             // if auto show is running, stop it
//             if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
//             el.goToNextSlide();
//         };
//
//         /**
//          * Click prev binding
//          *
//          * @param e (event)
//          *  - DOM event object
//          */
//         var clickPrevBind = function(e) {
//             e.preventDefault();
//             if (slider.controls.el.hasClass('disabled')) { return; }
//             // if auto show is running, stop it
//             if (slider.settings.auto && slider.settings.stopAutoOnClick) { el.stopAuto(); }
//             el.goToPrevSlide();
//         };
//
//         /**
//          * Click start binding
//          *
//          * @param e (event)
//          *  - DOM event object
//          */
//         var clickStartBind = function(e) {
//             el.startAuto();
//             e.preventDefault();
//         };
//
//         /**
//          * Click stop binding
//          *
//          * @param e (event)
//          *  - DOM event object
//          */
//         var clickStopBind = function(e) {
//             el.stopAuto();
//             e.preventDefault();
//         };
//
//         /**
//          * Click pager binding
//          *
//          * @param e (event)
//          *  - DOM event object
//          */
//         var clickPagerBind = function(e) {
//             var pagerLink, pagerIndex;
//             e.preventDefault();
//             if (slider.controls.el.hasClass('disabled')) {
//                 return;
//             }
//             // if auto show is running, stop it
//             if (slider.settings.auto  && slider.settings.stopAutoOnClick) { el.stopAuto(); }
//             pagerLink = $(e.currentTarget);
//             if (pagerLink.attr('data-slide-index') !== undefined) {
//                 pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
//                 // if clicked pager link is not active, continue with the goToSlide call
//                 if (pagerIndex !== slider.active.index) { el.goToSlide(pagerIndex); }
//             }
//         };
//
//         /**
//          * Updates the pager links with an active class
//          *
//          * @param slideIndex (int)
//          *  - index of slide to make active
//          */
//         var updatePagerActive = function(slideIndex) {
//             // if "short" pager type
//             var len = slider.children.length; // nb of children
//             if (slider.settings.pagerType === 'short') {
//                 if (slider.settings.maxSlides > 1) {
//                     len = Math.ceil(slider.children.length / slider.settings.maxSlides);
//                 }
//                 slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + len);
//                 return;
//             }
//             // remove all pager active classes
//             slider.pagerEl.find('a').removeClass('active');
//             // apply the active class for all pagers
//             slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
//         };
//
//         /**
//          * Performs needed actions after a slide transition
//          */
//         var updateAfterSlideTransition = function() {
//             // if infinite loop is true
//             if (slider.settings.infiniteLoop) {
//                 var position = '';
//                 // first slide
//                 if (slider.active.index === 0) {
//                     // set the new position
//                     position = slider.children.eq(0).position();
//                     // carousel, last slide
//                 } else if (slider.active.index === getPagerQty() - 1 && slider.carousel) {
//                     position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
//                     // last slide
//                 } else if (slider.active.index === slider.children.length - 1) {
//                     position = slider.children.eq(slider.children.length - 1).position();
//                 }
//                 if (position) {
//                     if (slider.settings.mode === 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
//                     else if (slider.settings.mode === 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
//                 }
//             }
//             // declare that the transition is complete
//             slider.working = false;
//             // onSlideAfter callback
//             slider.settings.onSlideAfter.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
//         };
//
//         /**
//          * Updates the auto controls state (either active, or combined switch)
//          *
//          * @param state (string) "start", "stop"
//          *  - the new state of the auto show
//          */
//         var updateAutoControls = function(state) {
//             // if autoControlsCombine is true, replace the current control with the new state
//             if (slider.settings.autoControlsCombine) {
//                 slider.controls.autoEl.html(slider.controls[state]);
//                 // if autoControlsCombine is false, apply the "active" class to the appropriate control
//             } else {
//                 slider.controls.autoEl.find('a').removeClass('active');
//                 slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
//             }
//         };
//
//         /**
//          * Updates the direction controls (checks if either should be hidden)
//          */
//         var updateDirectionControls = function() {
//             if (getPagerQty() === 1) {
//                 slider.controls.prev.addClass('disabled');
//                 slider.controls.next.addClass('disabled');
//             } else if (!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd) {
//                 // if first slide
//                 if (slider.active.index === 0) {
//                     slider.controls.prev.addClass('disabled');
//                     slider.controls.next.removeClass('disabled');
//                     // if last slide
//                 } else if (slider.active.index === getPagerQty() - 1) {
//                     slider.controls.next.addClass('disabled');
//                     slider.controls.prev.removeClass('disabled');
//                     // if any slide in the middle
//                 } else {
//                     slider.controls.prev.removeClass('disabled');
//                     slider.controls.next.removeClass('disabled');
//                 }
//             }
//         };
//
//         /**
//          * Initializes the auto process
//          */
//         var initAuto = function() {
//             // if autoDelay was supplied, launch the auto show using a setTimeout() call
//             if (slider.settings.autoDelay > 0) {
//                 var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
//                 // if autoDelay was not supplied, start the auto show normally
//             } else {
//                 el.startAuto();
//
//                 //add focus and blur events to ensure its running if timeout gets paused
//                 $(window).focus(function() {
//                     el.startAuto();
//                 }).blur(function() {
//                     el.stopAuto();
//                 });
//             }
//             // if autoHover is requested
//             if (slider.settings.autoHover) {
//                 // on el hover
//                 el.hover(function() {
//                     // if the auto show is currently playing (has an active interval)
//                     if (slider.interval) {
//                         // stop the auto show and pass true argument which will prevent control update
//                         el.stopAuto(true);
//                         // create a new autoPaused value which will be used by the relative "mouseout" event
//                         slider.autoPaused = true;
//                     }
//                 }, function() {
//                     // if the autoPaused value was created be the prior "mouseover" event
//                     if (slider.autoPaused) {
//                         // start the auto show and pass true argument which will prevent control update
//                         el.startAuto(true);
//                         // reset the autoPaused value
//                         slider.autoPaused = null;
//                     }
//                 });
//             }
//         };
//
//         /**
//          * Initializes the ticker process
//          */
//         var initTicker = function() {
//             var startPosition = 0,
//                 position, transform, value, idx, ratio, property, newSpeed, totalDimens;
//             // if autoDirection is "next", append a clone of the entire slider
//             if (slider.settings.autoDirection === 'next') {
//                 el.append(slider.children.clone().addClass('bx-clone'));
//                 // if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
//             } else {
//                 el.prepend(slider.children.clone().addClass('bx-clone'));
//                 position = slider.children.first().position();
//                 startPosition = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
//             }
//             setPositionProperty(startPosition, 'reset', 0);
//             // do not allow controls in ticker mode
//             slider.settings.pager = false;
//             slider.settings.controls = false;
//             slider.settings.autoControls = false;
//             // if autoHover is requested
//             if (slider.settings.tickerHover) {
//                 if (slider.usingCSS) {
//                     idx = slider.settings.mode === 'horizontal' ? 4 : 5;
//                     slider.viewport.hover(function() {
//                         transform = el.css('-' + slider.cssPrefix + '-transform');
//                         value = parseFloat(transform.split(',')[idx]);
//                         setPositionProperty(value, 'reset', 0);
//                     }, function() {
//                         totalDimens = 0;
//                         slider.children.each(function(index) {
//                             totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
//                         });
//                         // calculate the speed ratio (used to determine the new speed to finish the paused animation)
//                         ratio = slider.settings.speed / totalDimens;
//                         // determine which property to use
//                         property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
//                         // calculate the new speed
//                         newSpeed = ratio * (totalDimens - (Math.abs(parseInt(value))));
//                         tickerLoop(newSpeed);
//                     });
//                 } else {
//                     // on el hover
//                     slider.viewport.hover(function() {
//                         el.stop();
//                     }, function() {
//                         // calculate the total width of children (used to calculate the speed ratio)
//                         totalDimens = 0;
//                         slider.children.each(function(index) {
//                             totalDimens += slider.settings.mode === 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
//                         });
//                         // calculate the speed ratio (used to determine the new speed to finish the paused animation)
//                         ratio = slider.settings.speed / totalDimens;
//                         // determine which property to use
//                         property = slider.settings.mode === 'horizontal' ? 'left' : 'top';
//                         // calculate the new speed
//                         newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
//                         tickerLoop(newSpeed);
//                     });
//                 }
//             }
//             // start the ticker loop
//             tickerLoop();
//         };
//
//         /**
//          * Runs a continuous loop, news ticker-style
//          */
//         var tickerLoop = function(resumeSpeed) {
//             var speed = resumeSpeed ? resumeSpeed : slider.settings.speed,
//                 position = {left: 0, top: 0},
//                 reset = {left: 0, top: 0},
//                 animateProperty, resetValue, params;
//
//             // if "next" animate left position to last child, then reset left to 0
//             if (slider.settings.autoDirection === 'next') {
//                 position = el.find('.bx-clone').first().position();
//                 // if "prev" animate left position to 0, then reset left to first non-clone child
//             } else {
//                 reset = slider.children.first().position();
//             }
//             animateProperty = slider.settings.mode === 'horizontal' ? -position.left : -position.top;
//             resetValue = slider.settings.mode === 'horizontal' ? -reset.left : -reset.top;
//             params = {resetValue: resetValue};
//             setPositionProperty(animateProperty, 'ticker', speed, params);
//         };
//
//         /**
//          * Check if el is on screen
//          */
//         var isOnScreen = function(el) {
//             var win = $(window),
//                 viewport = {
//                     top: win.scrollTop(),
//                     left: win.scrollLeft()
//                 },
//                 bounds = el.offset();
//
//             viewport.right = viewport.left + win.width();
//             viewport.bottom = viewport.top + win.height();
//             bounds.right = bounds.left + el.outerWidth();
//             bounds.bottom = bounds.top + el.outerHeight();
//
//             return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
//         };
//
//         /**
//          * Initializes keyboard events
//          */
//         var keyPress = function(e) {
//             var activeElementTag = document.activeElement.tagName.toLowerCase(),
//                 tagFilters = 'input|textarea',
//                 p = new RegExp(activeElementTag,['i']),
//                 result = p.exec(tagFilters);
//
//             if (result == null && isOnScreen(el)) {
//                 if (e.keyCode === 39) {
//                     clickNextBind(e);
//                     return false;
//                 } else if (e.keyCode === 37) {
//                     clickPrevBind(e);
//                     return false;
//                 }
//             }
//         };
//
//         /**
//          * Initializes touch events
//          */
//         var initTouch = function() {
//             // initialize object to contain all touch values
//             slider.touch = {
//                 start: {x: 0, y: 0},
//                 end: {x: 0, y: 0}
//             };
//             slider.viewport.bind('touchstart MSPointerDown pointerdown', onTouchStart);
//
//             //for browsers that have implemented pointer events and fire a click after
//             //every pointerup regardless of whether pointerup is on same screen location as pointerdown or not
//             slider.viewport.on('click', '.bxslider a', function(e) {
//                 if (slider.viewport.hasClass('click-disabled')) {
//                     e.preventDefault();
//                     slider.viewport.removeClass('click-disabled');
//                 }
//             });
//         };
//
//         /**
//          * Event handler for "touchstart"
//          *
//          * @param e (event)
//          *  - DOM event object
//          */
//         var onTouchStart = function(e) {
//             //disable slider controls while user is interacting with slides to avoid slider freeze that happens on touch devices when a slide swipe happens immediately after interacting with slider controls
//             slider.controls.el.addClass('disabled');
//
//             if (slider.working) {
//                 e.preventDefault();
//                 slider.controls.el.removeClass('disabled');
//             } else {
//                 // record the original position when touch starts
//                 slider.touch.originalPos = el.position();
//                 var orig = e.originalEvent,
//                     touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig];
//                 // record the starting touch x, y coordinates
//                 slider.touch.start.x = touchPoints[0].pageX;
//                 slider.touch.start.y = touchPoints[0].pageY;
//
//                 if (slider.viewport.get(0).setPointerCapture) {
//                     slider.pointerId = orig.pointerId;
//                     slider.viewport.get(0).setPointerCapture(slider.pointerId);
//                 }
//                 // bind a "touchmove" event to the viewport
//                 slider.viewport.bind('touchmove MSPointerMove pointermove', onTouchMove);
//                 // bind a "touchend" event to the viewport
//                 slider.viewport.bind('touchend MSPointerUp pointerup', onTouchEnd);
//                 slider.viewport.bind('MSPointerCancel pointercancel', onPointerCancel);
//             }
//         };
//
//         /**
//          * Cancel Pointer for Windows Phone
//          *
//          * @param e (event)
//          *  - DOM event object
//          */
//         var onPointerCancel = function(e) {
//             /* onPointerCancel handler is needed to deal with situations when a touchend
//       doesn't fire after a touchstart (this happens on windows phones only) */
//             setPositionProperty(slider.touch.originalPos.left, 'reset', 0);
//
//             //remove handlers
//             slider.controls.el.removeClass('disabled');
//             slider.viewport.unbind('MSPointerCancel pointercancel', onPointerCancel);
//             slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
//             slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
//             if (slider.viewport.get(0).releasePointerCapture) {
//                 slider.viewport.get(0).releasePointerCapture(slider.pointerId);
//             }
//         };
//
//         /**
//          * Event handler for "touchmove"
//          *
//          * @param e (event)
//          *  - DOM event object
//          */
//         var onTouchMove = function(e) {
//             var orig = e.originalEvent,
//                 touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
//                 // if scrolling on y axis, do not prevent default
//                 xMovement = Math.abs(touchPoints[0].pageX - slider.touch.start.x),
//                 yMovement = Math.abs(touchPoints[0].pageY - slider.touch.start.y),
//                 value = 0,
//                 change = 0;
//
//             // x axis swipe
//             if ((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX) {
//                 e.preventDefault();
//                 // y axis swipe
//             } else if ((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY) {
//                 e.preventDefault();
//             }
//             if (slider.settings.mode !== 'fade' && slider.settings.oneToOneTouch) {
//                 // if horizontal, drag along x axis
//                 if (slider.settings.mode === 'horizontal') {
//                     change = touchPoints[0].pageX - slider.touch.start.x;
//                     value = slider.touch.originalPos.left + change;
//                     // if vertical, drag along y axis
//                 } else {
//                     change = touchPoints[0].pageY - slider.touch.start.y;
//                     value = slider.touch.originalPos.top + change;
//                 }
//                 setPositionProperty(value, 'reset', 0);
//             }
//         };
//
//         /**
//          * Event handler for "touchend"
//          *
//          * @param e (event)
//          *  - DOM event object
//          */
//         var onTouchEnd = function(e) {
//             slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
//             //enable slider controls as soon as user stops interacing with slides
//             slider.controls.el.removeClass('disabled');
//             var orig    = e.originalEvent,
//                 touchPoints = (typeof orig.changedTouches !== 'undefined') ? orig.changedTouches : [orig],
//                 value       = 0,
//                 distance    = 0;
//             // record end x, y positions
//             slider.touch.end.x = touchPoints[0].pageX;
//             slider.touch.end.y = touchPoints[0].pageY;
//             // if fade mode, check if absolute x distance clears the threshold
//             if (slider.settings.mode === 'fade') {
//                 distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
//                 if (distance >= slider.settings.swipeThreshold) {
//                     if (slider.touch.start.x > slider.touch.end.x) {
//                         el.goToNextSlide();
//                     } else {
//                         el.goToPrevSlide();
//                     }
//                     el.stopAuto();
//                 }
//                 // not fade mode
//             } else {
//                 // calculate distance and el's animate property
//                 if (slider.settings.mode === 'horizontal') {
//                     distance = slider.touch.end.x - slider.touch.start.x;
//                     value = slider.touch.originalPos.left;
//                 } else {
//                     distance = slider.touch.end.y - slider.touch.start.y;
//                     value = slider.touch.originalPos.top;
//                 }
//                 // if not infinite loop and first / last slide, do not attempt a slide transition
//                 if (!slider.settings.infiniteLoop && ((slider.active.index === 0 && distance > 0) || (slider.active.last && distance < 0))) {
//                     setPositionProperty(value, 'reset', 200);
//                 } else {
//                     // check if distance clears threshold
//                     if (Math.abs(distance) >= slider.settings.swipeThreshold) {
//                         if (distance < 0) {
//                             el.goToNextSlide();
//                         } else {
//                             el.goToPrevSlide();
//                         }
//                         el.stopAuto();
//                     } else {
//                         // el.animate(property, 200);
//                         setPositionProperty(value, 'reset', 200);
//                     }
//                 }
//             }
//             slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
//             if (slider.viewport.get(0).releasePointerCapture) {
//                 slider.viewport.get(0).releasePointerCapture(slider.pointerId);
//             }
//         };
//
//         /**
//          * Window resize event callback
//          */
//         var resizeWindow = function(e) {
//             // don't do anything if slider isn't initialized.
//             if (!slider.initialized) { return; }
//             // Delay if slider working.
//             if (slider.working) {
//                 window.setTimeout(resizeWindow, 10);
//             } else {
//                 // get the new window dimens (again, thank you IE)
//                 var windowWidthNew = $(window).width(),
//                     windowHeightNew = $(window).height();
//                 // make sure that it is a true window resize
//                 // *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
//                 // are resized. Can you just die already?*
//                 if (windowWidth !== windowWidthNew || windowHeight !== windowHeightNew) {
//                     // set the new window dimens
//                     windowWidth = windowWidthNew;
//                     windowHeight = windowHeightNew;
//                     // update all dynamic elements
//                     el.redrawSlider();
//                     // Call user resize handler
//                     slider.settings.onSliderResize.call(el, slider.active.index);
//                 }
//             }
//         };
//
//         /**
//          * Adds an aria-hidden=true attribute to each element
//          *
//          * @param startVisibleIndex (int)
//          *  - the first visible element's index
//          */
//         var applyAriaHiddenAttributes = function(startVisibleIndex) {
//             var numberOfSlidesShowing = getNumberSlidesShowing();
//             // only apply attributes if the setting is enabled and not in ticker mode
//             if (slider.settings.ariaHidden && !slider.settings.ticker) {
//                 // add aria-hidden=true to all elements
//                 slider.children.attr('aria-hidden', 'true');
//                 // get the visible elements and change to aria-hidden=false
//                 slider.children.slice(startVisibleIndex, startVisibleIndex + numberOfSlidesShowing).attr('aria-hidden', 'false');
//             }
//         };
//
//         /**
//          * ===================================================================================
//          * = PUBLIC FUNCTIONS
//          * ===================================================================================
//          */
//
//         /**
//          * Performs slide transition to the specified slide
//          *
//          * @param slideIndex (int)
//          *  - the destination slide's index (zero-based)
//          *
//          * @param direction (string)
//          *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
//          */
//         el.goToSlide = function(slideIndex, direction) {
//             // onSlideBefore, onSlideNext, onSlidePrev callbacks
//             // Allow transition canceling based on returned value
//             var performTransition = true,
//                 moveBy = 0,
//                 position = {left: 0, top: 0},
//                 lastChild = null,
//                 lastShowingIndex, eq, value, requestEl;
//
//             // if plugin is currently in motion, ignore request
//             if (slider.working || slider.active.index === slideIndex) { return; }
//             // declare that plugin is in motion
//             slider.working = true;
//             // store the old index
//             slider.oldIndex = slider.active.index;
//             // if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
//             if (slideIndex < 0) {
//                 slider.active.index = getPagerQty() - 1;
//                 // if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
//             } else if (slideIndex >= getPagerQty()) {
//                 slider.active.index = 0;
//                 // set active index to requested slide
//             } else {
//                 slider.active.index = slideIndex;
//             }
//
//             performTransition = slider.settings.onSlideBefore.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
//
//             if (typeof (performTransition) !== 'undefined' && !performTransition) {
//                 slider.active.index = slider.oldIndex; // restore old index
//                 slider.working = false; // is not in motion
//                 return;
//             }
//             if (direction === 'next') {
//                 // Prevent canceling in future functions or lack there-of from negating previous commands to cancel
//                 if (!slider.settings.onSlideNext.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
//                     performTransition = false;
//                 }
//             } else if (direction === 'prev') {
//                 // Prevent canceling in future functions or lack there-of from negating previous commands to cancel
//                 if (!slider.settings.onSlidePrev.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)) {
//                     performTransition = false;
//                 }
//             }
//
//             // If transitions canceled, reset and return
//             if (typeof (performTransition) !== 'undefined' && !performTransition) {
//                 slider.active.index = slider.oldIndex; // restore old index
//                 slider.working = false; // is not in motion
//                 return;
//             }
//
//             // check if last slide
//             slider.active.last = slider.active.index >= getPagerQty() - 1;
//             // update the pager with active class
//             if (slider.settings.pager || slider.settings.pagerCustom) { updatePagerActive(slider.active.index); }
//             // // check for direction control update
//             if (slider.settings.controls) { updateDirectionControls(); }
//             // if slider is set to mode: "fade"
//             if (slider.settings.mode === 'fade') {
//                 // if adaptiveHeight is true and next height is different from current height, animate to the new height
//                 if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
//                     slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
//                 }
//                 // fade out the visible child and reset its z-index value
//                 slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
//                 // fade in the newly requested slide
//                 slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex + 1).fadeIn(slider.settings.speed, function() {
//                     $(this).css('zIndex', slider.settings.slideZIndex);
//                     updateAfterSlideTransition();
//                 });
//                 // slider mode is not "fade"
//             } else {
//                 // if adaptiveHeight is true and next height is different from current height, animate to the new height
//                 if (slider.settings.adaptiveHeight && slider.viewport.height() !== getViewportHeight()) {
//                     slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
//                 }
//                 // if carousel and not infinite loop
//                 if (!slider.settings.infiniteLoop && slider.carousel && slider.active.last) {
//                     if (slider.settings.mode === 'horizontal') {
//                         // get the last child position
//                         lastChild = slider.children.eq(slider.children.length - 1);
//                         position = lastChild.position();
//                         // calculate the position of the last slide
//                         moveBy = slider.viewport.width() - lastChild.outerWidth();
//                     } else {
//                         // get last showing index position
//                         lastShowingIndex = slider.children.length - slider.settings.minSlides;
//                         position = slider.children.eq(lastShowingIndex).position();
//                     }
//                     // horizontal carousel, going previous while on first slide (infiniteLoop mode)
//                 } else if (slider.carousel && slider.active.last && direction === 'prev') {
//                     // get the last child position
//                     eq = slider.settings.moveSlides === 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
//                     lastChild = el.children('.bx-clone').eq(eq);
//                     position = lastChild.position();
//                     // if infinite loop and "Next" is clicked on the last slide
//                 } else if (direction === 'next' && slider.active.index === 0) {
//                     // get the last clone position
//                     position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
//                     slider.active.last = false;
//                     // normal non-zero requests
//                 } else if (slideIndex >= 0) {
//                     requestEl = slideIndex * getMoveBy();
//                     position = slider.children.eq(requestEl).position();
//                 }
//
//                 /* If the position doesn't exist
//          * (e.g. if you destroy the slider on a next click),
//          * it doesn't throw an error.
//          */
//                 if (typeof (position) !== undefined) {
//                     value = slider.settings.mode === 'horizontal' ? -(position.left - moveBy) : -position.top;
//                     // plugin values to be animated
//                     setPositionProperty(value, 'slide', slider.settings.speed);
//                 }
//             }
//             if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
//         };
//
//         /**
//          * Transitions to the next slide in the show
//          */
//         el.goToNextSlide = function() {
//             // if infiniteLoop is false and last page is showing, disregard call
//             if (!slider.settings.infiniteLoop && slider.active.last) { return; }
//             var pagerIndex = parseInt(slider.active.index) + 1;
//             el.goToSlide(pagerIndex, 'next');
//         };
//
//         /**
//          * Transitions to the prev slide in the show
//          */
//         el.goToPrevSlide = function() {
//             // if infiniteLoop is false and last page is showing, disregard call
//             if (!slider.settings.infiniteLoop && slider.active.index === 0) { return; }
//             var pagerIndex = parseInt(slider.active.index) - 1;
//             el.goToSlide(pagerIndex, 'prev');
//         };
//
//         /**
//          * Starts the auto show
//          *
//          * @param preventControlUpdate (boolean)
//          *  - if true, auto controls state will not be updated
//          */
//         el.startAuto = function(preventControlUpdate) {
//             // if an interval already exists, disregard call
//             if (slider.interval) { return; }
//             // create an interval
//             slider.interval = setInterval(function() {
//                 if (slider.settings.autoDirection === 'next') {
//                     el.goToNextSlide();
//                 } else {
//                     el.goToPrevSlide();
//                 }
//             }, slider.settings.pause);
//             // if auto controls are displayed and preventControlUpdate is not true
//             if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('stop'); }
//         };
//
//         /**
//          * Stops the auto show
//          *
//          * @param preventControlUpdate (boolean)
//          *  - if true, auto controls state will not be updated
//          */
//         el.stopAuto = function(preventControlUpdate) {
//             // if no interval exists, disregard call
//             if (!slider.interval) { return; }
//             // clear the interval
//             clearInterval(slider.interval);
//             slider.interval = null;
//             // if auto controls are displayed and preventControlUpdate is not true
//             if (slider.settings.autoControls && preventControlUpdate !== true) { updateAutoControls('start'); }
//         };
//
//         /**
//          * Returns current slide index (zero-based)
//          */
//         el.getCurrentSlide = function() {
//             return slider.active.index;
//         };
//
//         /**
//          * Returns current slide element
//          */
//         el.getCurrentSlideElement = function() {
//             return slider.children.eq(slider.active.index);
//         };
//
//         /**
//          * Returns a slide element
//          * @param index (int)
//          *  - The index (zero-based) of the element you want returned.
//          */
//         el.getSlideElement = function(index) {
//             return slider.children.eq(index);
//         };
//
//         /**
//          * Returns number of slides in show
//          */
//         el.getSlideCount = function() {
//             return slider.children.length;
//         };
//
//         /**
//          * Return slider.working variable
//          */
//         el.isWorking = function() {
//             return slider.working;
//         };
//
//         /**
//          * Update all dynamic slider elements
//          */
//         el.redrawSlider = function() {
//             // resize all children in ratio to new screen size
//             slider.children.add(el.find('.bx-clone')).outerWidth(getSlideWidth());
//             // adjust the height
//             slider.viewport.css('height', getViewportHeight());
//             // update the slide position
//             if (!slider.settings.ticker) { setSlidePosition(); }
//             // if active.last was true before the screen resize, we want
//             // to keep it last no matter what screen size we end on
//             if (slider.active.last) { slider.active.index = getPagerQty() - 1; }
//             // if the active index (page) no longer exists due to the resize, simply set the index as last
//             if (slider.active.index >= getPagerQty()) { slider.active.last = true; }
//             // if a pager is being displayed and a custom pager is not being used, update it
//             if (slider.settings.pager && !slider.settings.pagerCustom) {
//                 populatePager();
//                 updatePagerActive(slider.active.index);
//             }
//             if (slider.settings.ariaHidden) { applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }
//         };
//
//         /**
//          * Destroy the current instance of the slider (revert everything back to original state)
//          */
//         el.destroySlider = function() {
//             // don't do anything if slider has already been destroyed
//             if (!slider.initialized) { return; }
//             slider.initialized = false;
//             $('.bx-clone', this).remove();
//             slider.children.each(function() {
//                 if ($(this).data('origStyle') !== undefined) {
//                     $(this).attr('style', $(this).data('origStyle'));
//                 } else {
//                     $(this).removeAttr('style');
//                 }
//             });
//             if ($(this).data('origStyle') !== undefined) {
//                 this.attr('style', $(this).data('origStyle'));
//             } else {
//                 $(this).removeAttr('style');
//             }
//             $(this).unwrap().unwrap();
//             if (slider.controls.el) { slider.controls.el.remove(); }
//             if (slider.controls.next) { slider.controls.next.remove(); }
//             if (slider.controls.prev) { slider.controls.prev.remove(); }
//             if (slider.pagerEl && slider.settings.controls && !slider.settings.pagerCustom) { slider.pagerEl.remove(); }
//             $('.bx-caption', this).remove();
//             if (slider.controls.autoEl) { slider.controls.autoEl.remove(); }
//             clearInterval(slider.interval);
//             if (slider.settings.responsive) { $(window).unbind('resize', resizeWindow); }
//             if (slider.settings.keyboardEnabled) { $(document).unbind('keydown', keyPress); }
//             //remove self reference in data
//             $(this).removeData('bxSlider');
//         };
//
//         /**
//          * Reload the slider (revert all DOM changes, and re-initialize)
//          */
//         el.reloadSlider = function(settings) {
//             if (settings !== undefined) { options = settings; }
//             el.destroySlider();
//             init();
//             //store reference to self in order to access public functions later
//             $(el).data('bxSlider', this);
//         };
//
//         init();
//
//         $(el).data('bxSlider', this);
//
//         // returns the current $J object
//         return this;
//     };
//
// })($J);
//
// /*!
//  * SuperSlide v2.1
//  * 轻松解决网站大部分特效展示问题 *
//  * Copyright 2011-2013, 大话主席
//  * 请尊重原创，保留头部版权
//  * 在保留版权的前提下可应用于个人或商业用途
//  */
// (function(a){a.fn.slide=function(b){return a.fn.slide.defaults={type:"slide",effect:"fade",autoPlay:!1,delayTime:500,interTime:2500,triggerTime:150,defaultIndex:0,titCell:".hd li",mainCell:".bd",targetCell:null,trigger:"mouseover",scroll:1,vis:1,titOnClassName:"on",autoPage:!1,prevCell:".prev",nextCell:".next",pageStateCell:".pageState",opp:!1,pnLoop:!0,easing:"swing",startFun:null,endFun:null,switchLoad:null,playStateCell:".playState",mouseOverStop:!0,defaultPlay:!0,returnDefault:!1},this.each(function(){var c=a.extend({},a.fn.slide.defaults,b),d=a(this),e=c.effect,f=a(c.prevCell,d),g=a(c.nextCell,d),h=a(c.pageStateCell,d),i=a(c.playStateCell,d),j=a(c.titCell,d),k=j.size(),l=a(c.mainCell,d),m=l.children().size(),n=c.switchLoad,o=a(c.targetCell,d),p=parseInt(c.defaultIndex),q=parseInt(c.delayTime),r=parseInt(c.interTime);parseInt(c.triggerTime);var P,t=parseInt(c.scroll),u=parseInt(c.vis),v="false"==c.autoPlay||0==c.autoPlay?!1:!0,w="false"==c.opp||0==c.opp?!1:!0,x="false"==c.autoPage||0==c.autoPage?!1:!0,y="false"==c.pnLoop||0==c.pnLoop?!1:!0,z="false"==c.mouseOverStop||0==c.mouseOverStop?!1:!0,A="false"==c.defaultPlay||0==c.defaultPlay?!1:!0,B="false"==c.returnDefault||0==c.returnDefault?!1:!0,C=0,D=0,E=0,F=0,G=c.easing,H=null,I=null,J=null,K=c.titOnClassName,L=j.index(d.find("."+K)),M=p=defaultIndex=-1==L?p:L,N=p,O=m>=u?0!=m%t?m%t:t:0,Q="leftMarquee"==e||"topMarquee"==e?!0:!1,R=function(){a.isFunction(c.startFun)&&c.startFun(p,k,d,a(c.titCell,d),l,o,f,g)},S=function(){a.isFunction(c.endFun)&&c.endFun(p,k,d,a(c.titCell,d),l,o,f,g)},T=function(){j.removeClass(K),A&&j.eq(defaultIndex).addClass(K)};if("menu"==c.type)return A&&j.removeClass(K).eq(p).addClass(K),j.hover(function(){P=a(this).find(c.targetCell);var b=j.index(a(this));I=setTimeout(function(){switch(p=b,j.removeClass(K).eq(p).addClass(K),R(),e){case"fade":P.stop(!0,!0).animate({opacity:"show"},q,G,S);break;case"slideDown":P.stop(!0,!0).animate({height:"show"},q,G,S)}},c.triggerTime)},function(){switch(clearTimeout(I),e){case"fade":P.animate({opacity:"hide"},q,G);break;case"slideDown":P.animate({height:"hide"},q,G)}}),B&&d.hover(function(){clearTimeout(J)},function(){J=setTimeout(T,q)}),void 0;if(0==k&&(k=m),Q&&(k=2),x){if(m>=u)if("leftLoop"==e||"topLoop"==e)k=0!=m%t?(0^m/t)+1:m/t;else{var U=m-u;k=1+parseInt(0!=U%t?U/t+1:U/t),0>=k&&(k=1)}else k=1;j.html("");var V="";if(1==c.autoPage||"true"==c.autoPage)for(var W=0;k>W;W++)V+="<li>"+(W+1)+"</li>";else for(var W=0;k>W;W++)V+=c.autoPage.replace("$",W+1);j.html(V);var j=j.children()}if(m>=u){l.children().each(function(){a(this).width()>E&&(E=a(this).width(),D=a(this).outerWidth(!0)),a(this).height()>F&&(F=a(this).height(),C=a(this).outerHeight(!0))});var X=l.children(),Y=function(){for(var a=0;u>a;a++)X.eq(a).clone().addClass("clone").appendTo(l);for(var a=0;O>a;a++)X.eq(m-a-1).clone().addClass("clone").prependTo(l)};switch(e){case"fold":l.css({position:"relative",width:D,height:C}).children().css({position:"absolute",width:E,left:0,top:0,display:"none"});break;case"top":l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+u*C+'px"></div>').css({top:-(p*t)*C,position:"relative",padding:"0",margin:"0"}).children().css({height:F});break;case"left":l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+u*D+'px"></div>').css({width:m*D,left:-(p*t)*D,position:"relative",overflow:"hidden",padding:"0",margin:"0"}).children().css({"float":"left",width:E});break;case"leftLoop":case"leftMarquee":Y(),l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+u*D+'px"></div>').css({width:(m+u+O)*D,position:"relative",overflow:"hidden",padding:"0",margin:"0",left:-(O+p*t)*D}).children().css({"float":"left",width:E});break;case"topLoop":case"topMarquee":Y(),l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+u*C+'px"></div>').css({height:(m+u+O)*C,position:"relative",padding:"0",margin:"0",top:-(O+p*t)*C}).children().css({height:F})}}var Z=function(a){var b=a*t;return a==k?b=m:-1==a&&0!=m%t&&(b=-m%t),b},$=function(b){var c=function(c){for(var d=c;u+c>d;d++)b.eq(d).find("img["+n+"]").each(function(){var b=a(this);if(b.attr("src",b.attr(n)).removeAttr(n),l.find(".clone")[0])for(var c=l.children(),d=0;c.size()>d;d++)c.eq(d).find("img["+n+"]").each(function(){a(this).attr(n)==b.attr("src")&&a(this).attr("src",a(this).attr(n)).removeAttr(n)})})};switch(e){case"fade":case"fold":case"top":case"left":case"slideDown":c(p*t);break;case"leftLoop":case"topLoop":c(O+Z(N));break;case"leftMarquee":case"topMarquee":var d="leftMarquee"==e?l.css("left").replace("px",""):l.css("top").replace("px",""),f="leftMarquee"==e?D:C,g=O;if(0!=d%f){var h=Math.abs(0^d/f);g=1==p?O+h:O+h-1}c(g)}},_=function(a){if(!A||M!=p||a||Q){if(Q?p>=1?p=1:0>=p&&(p=0):(N=p,p>=k?p=0:0>p&&(p=k-1)),R(),null!=n&&$(l.children()),o[0]&&(P=o.eq(p),null!=n&&$(o),"slideDown"==e?(o.not(P).stop(!0,!0).slideUp(q),P.slideDown(q,G,function(){l[0]||S()})):(o.not(P).stop(!0,!0).hide(),P.animate({opacity:"show"},q,function(){l[0]||S()}))),m>=u)switch(e){case"fade":l.children().stop(!0,!0).eq(p).animate({opacity:"show"},q,G,function(){S()}).siblings().hide();break;case"fold":l.children().stop(!0,!0).eq(p).animate({opacity:"show"},q,G,function(){S()}).siblings().animate({opacity:"hide"},q,G);break;case"top":l.stop(!0,!1).animate({top:-p*t*C},q,G,function(){S()});break;case"left":l.stop(!0,!1).animate({left:-p*t*D},q,G,function(){S()});break;case"leftLoop":var b=N;l.stop(!0,!0).animate({left:-(Z(N)+O)*D},q,G,function(){-1>=b?l.css("left",-(O+(k-1)*t)*D):b>=k&&l.css("left",-O*D),S()});break;case"topLoop":var b=N;l.stop(!0,!0).animate({top:-(Z(N)+O)*C},q,G,function(){-1>=b?l.css("top",-(O+(k-1)*t)*C):b>=k&&l.css("top",-O*C),S()});break;case"leftMarquee":var c=l.css("left").replace("px","");0==p?l.animate({left:++c},0,function(){l.css("left").replace("px","")>=0&&l.css("left",-m*D)}):l.animate({left:--c},0,function(){-(m+O)*D>=l.css("left").replace("px","")&&l.css("left",-O*D)});break;case"topMarquee":var d=l.css("top").replace("px","");0==p?l.animate({top:++d},0,function(){l.css("top").replace("px","")>=0&&l.css("top",-m*C)}):l.animate({top:--d},0,function(){-(m+O)*C>=l.css("top").replace("px","")&&l.css("top",-O*C)})}j.removeClass(K).eq(p).addClass(K),M=p,y||(g.removeClass("nextStop"),f.removeClass("prevStop"),0==p&&f.addClass("prevStop"),p==k-1&&g.addClass("nextStop")),h.html("<span>"+(p+1)+"</span>/"+k)}};A&&_(!0),B&&d.hover(function(){clearTimeout(J)},function(){J=setTimeout(function(){p=defaultIndex,A?_():"slideDown"==e?P.slideUp(q,T):P.animate({opacity:"hide"},q,T),M=p},300)});var ab=function(a){H=setInterval(function(){w?p--:p++,_()},a?a:r)},bb=function(a){H=setInterval(_,a?a:r)},cb=function(){z||(clearInterval(H),ab())},db=function(){(y||p!=k-1)&&(p++,_(),Q||cb())},eb=function(){(y||0!=p)&&(p--,_(),Q||cb())},fb=function(){clearInterval(H),Q?bb():ab(),i.removeClass("pauseState")},gb=function(){clearInterval(H),i.addClass("pauseState")};if(v?Q?(w?p--:p++,bb(),z&&l.hover(gb,fb)):(ab(),z&&d.hover(gb,fb)):(Q&&(w?p--:p++),i.addClass("pauseState")),i.click(function(){i.hasClass("pauseState")?fb():gb()}),"mouseover"==c.trigger?j.hover(function(){var a=j.index(this);I=setTimeout(function(){p=a,_(),cb()},c.triggerTime)},function(){clearTimeout(I)}):j.click(function(){p=j.index(this),_(),cb()}),Q){if(g.mousedown(db),f.mousedown(eb),y){var hb,ib=function(){hb=setTimeout(function(){clearInterval(H),bb(0^r/10)},150)},jb=function(){clearTimeout(hb),clearInterval(H),bb()};g.mousedown(ib),g.mouseup(jb),f.mousedown(ib),f.mouseup(jb)}"mouseover"==c.trigger&&(g.hover(db,function(){}),f.hover(eb,function(){}))}else g.click(db),f.click(eb)})}})(jQuery),jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return 1>(b/=e/2)?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return 1>(b/=e/2)?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return 1>(b/=e/2)?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return 1>(b/=e/2)?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:1>(b/=e/2)?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return 1>(b/=e/2)?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),Math.abs(d)>h){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),Math.abs(d)>h){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=e*.3*1.5),Math.abs(d)>h){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return 1>b?-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c:.5*h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),1>(b/=e/2)?d/2*b*b*(((f*=1.525)+1)*b-f)+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return 1/2.75>(b/=e)?d*7.5625*b*b+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}});
// (function($) {
//     $.fn.rotateTabs = function(opts) {
//         var options = $.extend({}, $.fn.rotateTabs.defaults, opts);
//
//
//         var timer = null;
//         var $tabs = $(this);
//         var tab = options.tab_selector != null ? options.tab_selector + ' > li' : '> ul > li';
//         var content = options.content_selector != null ? options.content_selector + ' > div' : '> div';
//
//
//         return this.each(function() {
//
//
//
//
//             if (options.click) {
//                 $(tab, $tabs).click(tabs_event);
//             } else {
//                 $(tab, $tabs).click(function() { return false; });
//                 $(tab, $tabs).mouseenter(tabs_event);
//             }
//
//
//             $tabs.mouseover(function() {
//                 window.clearTimeout(timer);
//             });
//             $tabs.mouseout(function() {
//                 tabs_init();
//             });
//
//
//             var start = options.start;
//             if (options.random_start == true) {
//                 start = Math.floor(Math.random() * $(tab, $tabs).length);
//             }
//
//
//             $(tab, $tabs).eq(start).addClass('ui-tabs-selected').addClass('ui-state-active');
//             $(content, $tabs).eq(start).removeClass('ui-tabs-hide').css('display', 'block');
//
//
//             options.tabsshow($tabs, start);
//
//
//
//
//             tabs_init();
//         });
//
//
//         function tabs_init() {
//             window.clearTimeout(timer);
//
//             if (options.rotate == true) {
//                 timer = window.setInterval(function() {
//                     var $obj = $(tab + '.ui-tabs-selected', $tabs);
//                     var index = $obj.index();
//                     $obj.removeClass('ui-tabs-selected').removeClass('ui-state-active');
//
//
//                     if ($(tab, $tabs).length > index+1) index ++;
//                     else index = 0;
//
//
//                     $(tab, $tabs).eq(index).addClass('ui-tabs-selected').addClass('ui-state-active');
//
//                     $(content, $tabs).addClass('ui-tabs-hide').css('display', 'none');
//                     if (options.fade == false) {
//                         $(content, $tabs).eq(index).removeClass('ui-tabs-hide').css('display', 'block');
//                         options.tabsshow($tabs, index);
//
//
//                     } else {
//                         $(content, $tabs).eq(index).stop().removeClass('ui-tabs-hide').css({'display': 'block', 'opacity': '0'}).animate({'opacity': '1'}, {duration: options.speed, easing: 'linear', complete: function() { options.tabsshow($tabs, index); } });
//                     }
//
//
//
//
//                 }, options.sec);
//             }
//         }
//
//
//         function tabs_event() {
//             window.clearTimeout(timer);
//
//             var $obj = $(tab + '.ui-tabs-selected', $tabs);
//             var old_index = $obj.index();
//             $obj.removeClass('ui-tabs-selected').removeClass('ui-state-active');
//
//
//             var index = $(this).index();
//             $(tab, $tabs).eq(index).addClass('ui-tabs-selected').addClass('ui-state-active');
//
//             if (old_index == index) return false;
//
//             $(content, $tabs).addClass('ui-tabs-hide').css('display', 'none');
//             if (options.fade == false) {
//                 $(content, $tabs).eq(index).removeClass('ui-tabs-hide').css('display', 'block');
//                 options.tabsshow($tabs, index);
//             } else {
//                 $(content, $tabs).eq(index).stop().removeClass('ui-tabs-hide').css({'display': 'block', 'opacity': '0'}).animate({'opacity': '1'}, {duration: options.speed, easing: 'linear', complete: function() { options.tabsshow($tabs, index); } });
//             }
//
//
//
//
//             return false;
//         }
//     };
//
//
//     $.fn.rotateTabs.defaults = {
//         tab_selector: null,
//         content_selector: null,
//         fade: false,
//         speed: 400,
//         start: 0,
//         random_start: false,
//         click: false,
//         rotate: true,
//         sec: 3000,
//         tabsshow: function($tabs, index) { $tabs.trigger('tabsshow', index); }
//     };
//
//
// })($J);
// /*!
//  * $J Mousewheel 3.1.13
//  *
//  * Copyright $J Foundation and other contributors
//  * Released under the MIT license
//  * http://jquery.org/license
//  */
//
// (function (factory) {
//     if ( typeof define === 'function' && define.amd ) {
//         // AMD. Register as an anonymous module.
//         define(['jquery'], factory);
//     } else if (typeof exports === 'object') {
//         // Node/CommonJS style for Browserify
//         module.exports = factory;
//     } else {
//         // Browser globals
//         factory($J);
//     }
// }(function ($) {
//
//     var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
//         toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
//             ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
//         slice  = Array.prototype.slice,
//         nullLowestDeltaTimeout, lowestDelta;
//
//     if ( $.event.fixHooks ) {
//         for ( var i = toFix.length; i; ) {
//             $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
//         }
//     }
//
//     var special = $.event.special.mousewheel = {
//         version: '3.1.12',
//
//         setup: function() {
//             if ( this.addEventListener ) {
//                 for ( var i = toBind.length; i; ) {
//                     this.addEventListener( toBind[--i], handler, false );
//                 }
//             } else {
//                 this.onmousewheel = handler;
//             }
//             // Store the line height and page height for this particular element
//             $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
//             $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
//         },
//
//         teardown: function() {
//             if ( this.removeEventListener ) {
//                 for ( var i = toBind.length; i; ) {
//                     this.removeEventListener( toBind[--i], handler, false );
//                 }
//             } else {
//                 this.onmousewheel = null;
//             }
//             // Clean up the data we added to the element
//             $.removeData(this, 'mousewheel-line-height');
//             $.removeData(this, 'mousewheel-page-height');
//         },
//
//         getLineHeight: function(elem) {
//             var $elem = $(elem),
//                 $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
//             if (!$parent.length) {
//                 $parent = $('body');
//             }
//             return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
//         },
//
//         getPageHeight: function(elem) {
//             return $(elem).height();
//         },
//
//         settings: {
//             adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
//             normalizeOffset: true  // calls getBoundingClientRect for each event
//         }
//     };
//
//     $.fn.extend({
//         mousewheel: function(fn) {
//             return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
//         },
//
//         unmousewheel: function(fn) {
//             return this.unbind('mousewheel', fn);
//         }
//     });
//
//
//     function handler(event) {
//         var orgEvent   = event || window.event,
//             args       = slice.call(arguments, 1),
//             delta      = 0,
//             deltaX     = 0,
//             deltaY     = 0,
//             absDelta   = 0,
//             offsetX    = 0,
//             offsetY    = 0;
//         event = $.event.fix(orgEvent);
//         event.type = 'mousewheel';
//
//         // Old school scrollwheel delta
//         if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
//         if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
//         if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
//         if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }
//
//         // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
//         if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
//             deltaX = deltaY * -1;
//             deltaY = 0;
//         }
//
//         // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
//         delta = deltaY === 0 ? deltaX : deltaY;
//
//         // New school wheel delta (wheel event)
//         if ( 'deltaY' in orgEvent ) {
//             deltaY = orgEvent.deltaY * -1;
//             delta  = deltaY;
//         }
//         if ( 'deltaX' in orgEvent ) {
//             deltaX = orgEvent.deltaX;
//             if ( deltaY === 0 ) { delta  = deltaX * -1; }
//         }
//
//         // No change actually happened, no reason to go any further
//         if ( deltaY === 0 && deltaX === 0 ) { return; }
//
//         // Need to convert lines and pages to pixels if we aren't already in pixels
//         // There are three delta modes:
//         //   * deltaMode 0 is by pixels, nothing to do
//         //   * deltaMode 1 is by lines
//         //   * deltaMode 2 is by pages
//         if ( orgEvent.deltaMode === 1 ) {
//             var lineHeight = $.data(this, 'mousewheel-line-height');
//             delta  *= lineHeight;
//             deltaY *= lineHeight;
//             deltaX *= lineHeight;
//         } else if ( orgEvent.deltaMode === 2 ) {
//             var pageHeight = $.data(this, 'mousewheel-page-height');
//             delta  *= pageHeight;
//             deltaY *= pageHeight;
//             deltaX *= pageHeight;
//         }
//
//         // Store lowest absolute delta to normalize the delta values
//         absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );
//
//         if ( !lowestDelta || absDelta < lowestDelta ) {
//             lowestDelta = absDelta;
//
//             // Adjust older deltas if necessary
//             if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
//                 lowestDelta /= 40;
//             }
//         }
//
//         // Adjust older deltas if necessary
//         if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
//             // Divide all the things by 40!
//             delta  /= 40;
//             deltaX /= 40;
//             deltaY /= 40;
//         }
//
//         // Get a whole, normalized value for the deltas
//         delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
//         deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
//         deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);
//
//         // Normalise offsetX and offsetY properties
//         if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
//             var boundingRect = this.getBoundingClientRect();
//             offsetX = event.clientX - boundingRect.left;
//             offsetY = event.clientY - boundingRect.top;
//         }
//
//         // Add information to the event object
//         event.deltaX = deltaX;
//         event.deltaY = deltaY;
//         event.deltaFactor = lowestDelta;
//         event.offsetX = offsetX;
//         event.offsetY = offsetY;
//         // Go ahead and set deltaMode to 0 since we converted to pixels
//         // Although this is a little odd since we overwrite the deltaX/Y
//         // properties with normalized deltas.
//         event.deltaMode = 0;
//
//         // Add event and delta to the front of the arguments
//         args.unshift(event, delta, deltaX, deltaY);
//
//         // Clearout lowestDelta after sometime to better
//         // handle multiple device types that give different
//         // a different lowestDelta
//         // Ex: trackpad = 3 and mouse wheel = 120
//         if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
//         nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);
//
//         return ($.event.dispatch || $.event.handle).apply(this, args);
//     }
//
//     function nullLowestDelta() {
//         lowestDelta = null;
//     }
//
//     function shouldAdjustOldDeltas(orgEvent, absDelta) {
//         // If this is an older event and the delta is divisable by 120,
//         // then we are assuming that the browser is treating this as an
//         // older mouse wheel event and that we should divide the deltas
//         // by 40 to try and get a more usable deltaFactor.
//         // Side note, this actually impacts the reported scroll distance
//         // in older browsers and can cause scrolling to be slower than native.
//         // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
//         return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
//     }
//
// }));
// /* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
// !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a($J)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a($J)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
// /* == malihu jquery custom scrollbar plugin == Version: 3.1.1, License: MIT License (MIT) */
// !function(e){"undefined"!=typeof module&&module.exports?module.exports=e:e($J,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&N(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(V(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&V(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(V(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&V(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),j.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=q.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=Y.call(this,c[0],"y"),c[1]=Y.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",V(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",V(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&N(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){{o.data(a)}j.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),j.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),K(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),K(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir="+n.langDir+" /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=ee(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[14]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[15]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[16]+"' oncontextmenu='return false;' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(N(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),V(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),V(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),E.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),R.call(this),i.mouseWheel.enable){var r;t()}z.call(this),P.call(this),i.advanced.autoScrollOnFocus&&A.call(this),i.scrollButtons.enable&&H.call(this),i.keyboard.enable&&U.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),o.bindEvents&&(e(document).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),K(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),K(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),K(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(e){var t=e.type;switch(t){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return e.target.ownerDocument!==document?[e.originalEvent.screenY,e.originalEvent.screenX,!1]:[e.originalEvent.pageY,e.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var o=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],a=e.originalEvent.touches.length||e.originalEvent.changedTouches.length;return e.target.ownerDocument!==document?[o.screenY,o.screenX,a>1]:[o.pageY,o.pageX,a>1];default:return[e.pageY,e.pageX,!1]}},I=function(){function t(e){var t=m.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}}function o(e,t,o,a){if(m[0].idleTimer=u.scrollInertia<233?250:0,n.attr("id")===h[1])var i="x",r=(n[0].offsetLeft-t+a)*d.scrollRatio.x;else var i="y",r=(n[0].offsetTop-e+o)*d.scrollRatio.y;V(l,r.toString(),{dir:i,drag:!0})}var n,i,r,l=e(this),d=l.data(a),u=d.opt,f=a+"_"+d.idx,h=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],m=e("#mCSB_"+d.idx+"_container"),p=e("#"+h[0]+",#"+h[1]),g=u.advanced.releaseDraggableSelectors?p.add(e(u.advanced.releaseDraggableSelectors)):p;p.bind("mousedown."+f+" touchstart."+f+" pointerdown."+f+" MSPointerDown."+f,function(o){if(o.stopImmediatePropagation(),o.preventDefault(),Z(o)){c=!0,s&&(document.onselectstart=function(){return!1}),t(!1),N(l),n=e(this);var a=n.offset(),d=O(o)[0]-a.top,f=O(o)[1]-a.left,h=n.height()+a.top,m=n.width()+a.left;h>d&&d>0&&m>f&&f>0&&(i=d,r=f),C(n,"active",u.autoExpandScrollbar)}}).bind("touchmove."+f,function(e){e.stopImmediatePropagation(),e.preventDefault();var t=n.offset(),a=O(e)[0]-t.top,l=O(e)[1]-t.left;o(i,r,a,l)}),e(document).bind("mousemove."+f+" pointermove."+f+" MSPointerMove."+f,function(e){if(n){var t=n.offset(),a=O(e)[0]-t.top,l=O(e)[1]-t.left;if(i===a&&r===l)return;o(i,r,a,l)}}).add(g).bind("mouseup."+f+" touchend."+f+" pointerup."+f+" MSPointerUp."+f,function(e){n&&(C(n,"active",u.autoExpandScrollbar),n=null),c=!1,s&&(document.onselectstart=null),t(!0)})},D=function(){function o(e){if(!$(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,A=[O(e)[0],O(e)[1]]}function n(e){if($(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=G();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(R.push(o),E.push(a),A[2]=Math.abs(O(e)[0]-A[0]),A[3]=Math.abs(O(e)[1]-A[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*A[3]<A[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*A[2]<A[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],L,n,"y","all",!0),B.overflowed[1]&&s(w[1],L,n,"x",z,!0)}}function i(e){if(!$(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),N(y),p=G();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,R=[],E=[]}function r(e){if($(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=G();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[R[R.length-2],E[E.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",z,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",z,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&V(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],R=[],E=[],L=0,z="yx"===T.axis?"none":"all",A=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},R=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,F(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(e){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(e){t||(i&&(i=0,n("off",null)),c=!1)})},E=function(){function t(t,a){if(N(o),!L(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v=t.deltaX||t.deltaY||a;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<2&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),V(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},W=function(e){var t=null;try{var o=e.contentDocument||e.contentWindow.document;t=o.body.innerHTML}catch(a){}return null!==t},L=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},z=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(e){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){N(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-.9*u*l.width()}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-.9*u*l.height()}V(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},A=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(o){var a=e(document.activeElement),i=r.find(".mCustomScrollBox").length,s=0;a.is(n.advanced.autoScrollOnFocus)&&(N(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=i?(s+17)*i:0,t[0]._focusTimeout=setTimeout(function(){var e=[te(a)[0],te(a)[1]],o=[r[0].offsetTop,r[0].offsetLeft],i=[o[0]+e[0]>=0&&o[0]+e[0]<l.height()-a.outerHeight(!1),o[1]+e[1]>=0&&o[0]+e[1]<l.width()-a.outerWidth(!1)],c="yx"!==n.axis||i[0]||i[1]?"all":"none";"x"===n.axis||i[0]||V(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s}),"y"===n.axis||i[1]||V(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s})},t[0]._focusTimer))})},P=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(t){(0!==i.scrollTop()||0!==i.scrollLeft())&&e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.snapAmount||n.scrollButtons.scrollAmount,F(t,e,o)}if(a.preventDefault(),Z(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},U=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.snapAmount||i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||F(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){N(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-.9*f*d.width();else var h="y",m=Math.abs(c[0].offsetTop)-.9*f*d.height();V(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;V(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},F=function(t,o,n,i,r){function l(e){var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],u="x"===f.dir[0]?s[1]+f.dir[1]*d[1]*n:s[0]+f.dir[1]*d[0]*n,m="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),v="auto"!==f.scrollAmount?m:u,x=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",_=e?!0:!1;return e&&17>a&&(v="x"===f.dir[0]?s[1]:s[0]),V(t,v.toString(),{dir:f.dir[0],scrollEasing:x,dur:a,onComplete:_}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),K(f,"step"),N(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type?!0:!1,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],N(t),ee(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},q=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},Y=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1):l.outerHeight(!1),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?te(m)[1]:te(m)[0];case"string":case"number":if(ee(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&ee(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?te(m)[1]:te(m)[0]}return e(t).length?"x"===o?te(e(t))[1]:te(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},j=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void K(f[0],"autoUpdate")):void o()},X=function(e,t,o){return Math.round(e/t)*t-o},N=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){J.call(this)})},V=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){
//     return[c.callbacks.alwaysTriggerOffsets||_>=w[0]+b,c.callbacks.alwaysTriggerOffsets||-y>=_]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[v[0].offsetTop,v[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?q.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?q.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,(0!==m.scrollTop()||0!==m.scrollLeft())&&(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){switch(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount&&(o=X(o,c.snapAmount,c.snapOffset)),n.dir){case"x":var v=e("#mCSB_"+s.idx+"_dragger_horizontal"),x="left",_=h[0].offsetLeft,w=[f.width()-h.outerWidth(!1),v.parent().width()-v.width()],S=[o,0===o?0:o/s.scrollRatio.x],b=p[1],y=g[1],B=b>0?b/s.scrollRatio.x:0,T=y>0?y/s.scrollRatio.x:0;break;case"y":var v=e("#mCSB_"+s.idx+"_dragger_vertical"),x="top",_=h[0].offsetTop,w=[f.height()-h.outerHeight(!1),v.parent().height()-v.height()],S=[o,0===o?0:o/s.scrollRatio.y],b=p[0],y=g[0],B=b>0?b/s.scrollRatio.y:0,T=y>0?y/s.scrollRatio.y:0}S[1]<0||0===S[0]&&0===S[1]?S=[0,0]:S[1]>=w[1]?S=[w[0],w[1]]:S[0]=-S[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),(s.tweenRunning||!(0===_&&S[0]>=0||_===w[0]&&S[0]<=w[0]))&&(Q(v[0],x,Math.round(S[1]),u[1],n.scrollEasing),Q(h[0],x,Math.round(S[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(v),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&S[1]>=w[1]-B&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&S[1]<=T&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(v,"hide")},e)}}}))}},Q=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=G()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=G(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},G=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},J=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},K=function(e,t){try{delete e[t]}catch(o){e[t]=null}},Z=function(e){return!(e.which&&1!==e.which)},$=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},ee=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},te=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).load(function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+te(n)[0]>=0&&a[0]+te(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+te(n)[1]>=0&&a[1]+te(n)[1]<o.width()-n.outerWidth(!1)},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});
// /* globals JQClass */
// /*! Simple JavaScript Inheritance
//  * By John Resig http://ejohn.org/
//  * MIT Licensed.
//  */
// // Inspired by base2 and Prototype
// (function(){
//     'use strict';
//     var initializing = false;
//
//     // The base JQClass implementation (does nothing)
//     window.JQClass = function(){};
//
//     // Collection of derived classes
//     JQClass.classes = {};
//
//     // Create a new JQClass that inherits from this class
//     JQClass.extend = function extender(prop) {
//         var base = this.prototype;
//
//         // Instantiate a base class (but only create the instance, don't run the init constructor)
//         initializing = true;
//         var prototype = new this();
//         initializing = false;
//
//         // Copy the properties over onto the new prototype
//         for (var name in prop) { // jshint loopfunc:true
//             // Check if we're overwriting an existing function
//             if (typeof prop[name] === 'function' && typeof base[name] === 'function') {
//                 prototype[name] = (function (name, fn) {
//                     return function () {
//                         var __super = this._super;
//                         // Add a new ._super() method that is the same method but on the super-class
//                         this._super = function (args) {
//                             return base[name].apply(this, args || []);
//                         };
//                         var ret = fn.apply(this, arguments);
//                         // The method only needs to be bound temporarily, so we remove it when we're done executing
//                         this._super = __super;
//                         return ret;
//                     };
//                 })(name, prop[name]);
//                 // Check if we're overwriting existing default options.
//             } else if (typeof prop[name] === 'object' && typeof base[name] === 'object' && name === 'defaultOptions') {
//                 var obj1 = base[name];
//                 var obj2 = prop[name];
//                 var obj3 = {};
//                 var key;
//                 for (key in obj1) { // jshint forin:false
//                     obj3[key] = obj1[key];
//                 }
//                 for (key in obj2) { // jshint forin:false
//                     obj3[key] = obj2[key];
//                 }
//                 prototype[name] = obj3;
//             } else {
//                 prototype[name] = prop[name];
//             }
//         }
//
//         // The dummy class constructor
//         function JQClass() {
//             // All construction is actually done in the init method
//             if (!initializing && this._init) {
//                 this._init.apply(this, arguments);
//             }
//         }
//
//         // Populate our constructed prototype object
//         JQClass.prototype = prototype;
//
//         // Enforce the constructor to be what we expect
//         JQClass.prototype.constructor = JQClass;
//
//         // And make this class extendable
//         JQClass.extend = extender;
//
//         return JQClass;
//     };
// })();
// /*! Abstract base class for collection plugins v1.0.2.
// 	Written by Keith Wood (wood.keith{at}optusnet.com.au) December 2013.
// 	Licensed under the MIT license (http://keith-wood.name/licence.html). */
// (function($) { // Ensure $, encapsulate
//     'use strict';
//
//     /** <p>Abstract base class for collection plugins v1.0.2.</p>
//      <p>Written by Keith Wood (wood.keith{at}optusnet.com.au) December 2013.</p>
//      <p>Licensed under the MIT license (http://keith-wood.name/licence.html).</p>
//      <p>Use {@link $.JQPlugin.createPlugin} to create new plugins using this framework.</p>
//      <p>This base class provides common functionality such as:</p>
//      <ul>
//      <li>Creates $J bridge - allowing you to invoke your plugin on a collection of elements.</li>
//      <li>Handles initialisation including reading settings from metadata -
//      an instance object is attached to the affected element(s) containing all the necessary data.</li>
//      <li>Handles option retrieval and update - options can be set through default values,
//      through inline metadata, or through instantiation settings.<br>
//      Metadata is specified as an attribute on the element:
//      <code>data-&lt;pluginName>="&lt;option name>: '&lt;value>', ..."</code>.
//      Dates should be specified as strings in this format: <code>'new Date(y, m-1, d)'</code>.</li>
//      <li>Handles method calling - inner functions starting with '_'are inaccessible,
//      whereas others can be called via <code>$(selector).pluginName('functionName')</code>.</li>
//      <li>Handles plugin destruction - removing all trace of the plugin.</li>
//      </ul>
//      @module JQPlugin
//      @abstract */
//     JQClass.classes.JQPlugin = JQClass.extend({
//
//         /** Name to identify this plugin.
//          @example name: 'tabs' */
//         name: 'plugin',
//
//         /** Default options for instances of this plugin (default: {}).
//          @example defaultOptions: {
//   selectedClass: 'selected',
//   triggers: 'click'
// } */
//         defaultOptions: {},
//
//         /** Options dependent on the locale.
//          Indexed by language and (optional) country code, with '' denoting the default language (English/US).
//          Normally additional languages would be provided as separate files to all them to be included as needed.
//          @example regionalOptions: {
//   '': {
//     greeting: 'Hi'
//   }
// } */
//         regionalOptions: {},
//
//         /** Whether or not a deep merge should be performed when accumulating options.
//          The default is <code>true</code> but can be overridden in a sub-class. */
//         deepMerge: true,
//
//         /** Retrieve a marker class for affected elements.
//          In the format: <code>is-&lt;pluginName&gt;</code>.
//          @protected
//          @return {string} The marker class. */
//         _getMarker: function() {
//             return 'is-' + this.name;
//         },
//
//         /** Initialise the plugin.
//          Create the $J bridge - plugin name <code>xyz</code>
//          produces singleton <code>$.xyz</code> and collection function <code>$.fn.xyz</code>.
//          @protected */
//         _init: function() {
//             // Apply default localisations
//             $.extend(this.defaultOptions, (this.regionalOptions && this.regionalOptions['']) || {});
//             // Camel-case the name
//             var jqName = camelCase(this.name);
//             // Expose $J singleton manager
//             $[jqName] = this;
//             // Expose $J collection plugin
//             $.fn[jqName] = function(options) {
//                 var otherArgs = Array.prototype.slice.call(arguments, 1);
//                 var inst = this;
//                 var returnValue = this;
//                 this.each(function () {
//                     if (typeof options === 'string') {
//                         if (options[0] === '_' || !$[jqName][options]) {
//                             throw 'Unknown method: ' + options;
//                         }
//                         var methodValue = $[jqName][options].apply($[jqName], [this].concat(otherArgs));
//                         if (methodValue !== inst && methodValue !== undefined) {
//                             returnValue = methodValue;
//                             return false;
//                         }
//                     } else {
//                         $[jqName]._attach(this, options);
//                     }
//                 });
//                 return returnValue;
//             };
//         },
//
//         /** Set default options for all subsequent instances.
//          @param {object} options The new default options.
//          @example $.pluginName.setDefaults({name: value, ...}) */
//         setDefaults: function(options) {
//             $.extend(this.defaultOptions, options || {});
//         },
//
//         /** Initialise an element. Called internally only.
//          Adds an instance object as data named for the plugin.
//          Override {@linkcode module:JQPlugin~_postAttach|_postAttach} for plugin-specific processing.
//          @private
//          @param {Element} elem The element to enhance.
//          @param {object} options Overriding settings. */
//         _attach: function(elem, options) {
//             elem = $(elem);
//             if (elem.hasClass(this._getMarker())) {
//                 return;
//             }
//             elem.addClass(this._getMarker());
//             options = $.extend(this.deepMerge, {}, this.defaultOptions, this._getMetadata(elem), options || {});
//             var inst = $.extend({name: this.name, elem: elem, options: options}, this._instSettings(elem, options));
//             elem.data(this.name, inst); // Save instance against element
//             this._postAttach(elem, inst);
//             this.option(elem, options);
//         },
//
//         /** Retrieve additional instance settings.
//          Override this in a sub-class to provide extra settings.
//          These are added directly to the instance object.
//          Default attributes of an instance object are shown as properties below:
//          @protected
//          @param {$J} elem The current $J element.
//          @param {object} options The instance options.
//          @return {object} Any extra instance values.
//          @property {Element} elem The element to which this instance applies.
//          @property {string} name The name of this plugin.
//          @property {object} options The accumulated options for this instance.
//          @example _instSettings: function(elem, options) {
//   return {nav: elem.find(options.navSelector)};
// } */
//         _instSettings: function(elem, options) { // jshint unused:false
//             return {};
//         },
//
//         /** Plugin specific post initialisation.
//          Override this in a sub-class to perform extra activities.
//          This is where you would implement your plugin's main functionality.
//          @protected
//          @param {$J} elem The current $J element.
//          @param {object} inst The instance settings.
//          @example _postAttach: function(elem, inst) {
//   elem.on('click.' + this.name, function() {
//     ...
//   });
// } */
//         _postAttach: function(elem, inst) { // jshint unused:false
//         },
//
//         /** Retrieve metadata configuration from the element.
//          Metadata is specified as an attribute:
//          <code>data-&lt;pluginName>="&lt;option name>: '&lt;value>', ..."</code>.
//          Dates should be specified as strings in this format: <code>'new Date(y, m-1, d)'</code>.
//          @private
//          @param {$J} elem The source element.
//          @return {object} The inline configuration or {}. */
//         _getMetadata: function(elem) {
//             try {
//                 var data = elem.data(this.name.toLowerCase()) || '';
//                 data = data.replace(/(\\?)'/g, function(e, t) {
//                     return t ? '\'' : '"';
//                 }).replace(/([a-zA-Z0-9]+):/g, function(match, group, i) {
//                     var count = data.substring(0, i).match(/"/g); // Handle embedded ':'
//                     return (!count || count.length % 2 === 0 ? '"' + group + '":' : group + ':');
//                 }).replace(/\\:/g, ':');
//                 data = $.parseJSON('{' + data + '}');
//                 for (var key in data) {
//                     if (data.hasOwnProperty(key)) {
//                         var value = data[key];
//                         if (typeof value === 'string' && value.match(/^new Date\(([-0-9,\s]*)\)$/)) { // Convert dates
//                             data[key] = eval(value); // jshint ignore:line
//                         }
//                     }
//                 }
//                 return data;
//             }
//             catch (e) {
//                 return {};
//             }
//         },
//
//         /** Retrieve the instance data for element.
//          @protected
//          @param {Element} elem The source element.
//          @return {object} The instance data or <code>{}</code> if none. */
//         _getInst: function(elem) {
//             return $(elem).data(this.name) || {};
//         },
//
//         /** Retrieve or reconfigure the settings for a plugin.
//          If new settings are provided they are applied to the instance options.
//          If an option name only is provided the value of that option is returned.
//          If no name or value is provided, all options are returned.
//          Override {@linkcode module:JQPlugin~_optionsChanged|_optionsChanged}
//          for plugin-specific processing when option values change.
//          @param {Element} elem The source element.
//          @param {object|string} [name] The collection of new option values or the name of a single option.
//          @param {any} [value] The value for a single named option.
//          @return {any|object} If retrieving a single value or all options.
//          @example $(selector).plugin('option', 'name', value) // Set one option
//          $(selector).plugin('option', {name: value, ...}) // Set multiple options
//          var value = $(selector).plugin('option', 'name') // Get one option
//          var options = $(selector).plugin('option') // Get all options */
//         option: function(elem, name, value) {
//             elem = $(elem);
//             var inst = elem.data(this.name);
//             var options = name || {};
//             if  (!name || (typeof name === 'string' && typeof value === 'undefined')) {
//                 options = (inst || {}).options;
//                 return (options && name ? options[name] : options);
//             }
//             if (!elem.hasClass(this._getMarker())) {
//                 return;
//             }
//             if (typeof name === 'string') {
//                 options = {};
//                 options[name] = value;
//             }
//             this._optionsChanged(elem, inst, options);
//             $.extend(inst.options, options);
//         },
//
//         /** Plugin specific options processing.
//          Old value available in <code>inst.options[name]</code>, new value in <code>options[name]</code>.
//          Override this in a sub-class to perform extra activities.
//          @protected
//          @param {$J} elem The current $J element.
//          @param {object} inst The instance settings.
//          @param {object} options The new options.
//          @example _optionsChanged: function(elem, inst, options) {
//   if (options.name != inst.options.name) {
//     elem.removeClass(inst.options.name).addClass(options.name);
//   }
// } */
//         _optionsChanged: function(elem, inst, options) { // jshint unused:false
//         },
//
//         /** Remove all trace of the plugin.
//          Override {@linkcode module:JQPlugin~_preDestroy|_preDestroy} for plugin-specific processing.
//          @param {Element} elem The source element.
//          @example $(selector).plugin('destroy') */
//         destroy: function(elem) {
//             elem = $(elem);
//             if (!elem.hasClass(this._getMarker())) {
//                 return;
//             }
//             this._preDestroy(elem, this._getInst(elem));
//             elem.removeData(this.name).removeClass(this._getMarker());
//         },
//
//         /** Plugin specific pre destruction.
//          It is invoked as part of the {@linkcode module:JQPlugin~destroy|destroy} processing.
//          Override this in a sub-class to perform extra activities and undo everything that was
//          done in the {@linkcode module:JQPlugin~_postAttach|_postAttach} or
//          {@linkcode module:JQPlugin~_optionsChanged|_optionsChanged} functions.
//          @protected
//          @param {$J} elem The current $J element.
//          @param {object} inst The instance settings.
//          @example _preDestroy: function(elem, inst) {
//   elem.off('.' + this.name);
// } */
//         _preDestroy: function(elem, inst) { // jshint unused:false
//         }
//     });
//
//     /** Convert names from hyphenated to camel-case.
//      @private
//      @param {string} value The original hyphenated name.
//      @return {string} The camel-case version. */
//     function camelCase(name) {
//         return name.replace(/-([a-z])/g, function(match, group) {
//             return group.toUpperCase();
//         });
//     }
//
//     /** Expose the plugin base.
//      @namespace $.JQPlugin */
//     $.JQPlugin = {
//
//         /** Create a new collection plugin.
//          @memberof $.JQPlugin
//          @param {string} [superClass='JQPlugin'] The name of the parent class to inherit from.
//          @param {object} overrides The property/function overrides for the new class.
//          See {@link module:JQPlugin|JQPlugin} for the base functionality.
//          @example $.JQPlugin.createPlugin({ // Define the plugin
//   name: 'tabs',
//   defaultOptions: {selectedClass: 'selected'},
//   _initSettings: function(elem, options) { return {...}; },
//   _postAttach: function(elem, inst) { ... }
// });
//          $('selector').tabs(); // And instantiate it */
//         createPlugin: function(superClass, overrides) {
//             if (typeof superClass === 'object') {
//                 overrides = superClass;
//                 superClass = 'JQPlugin';
//             }
//             superClass = camelCase(superClass);
//             var className = camelCase(overrides.name);
//             JQClass.classes[className] = JQClass.classes[superClass].extend(overrides);
//             new JQClass.classes[className](); // jshint ignore:line
//         }
//     };
//
// })($J);
//
//
// /*! http://keith-wood.name/countdown.html
// 	Countdown for $J v2.1.0.
// 	Written by Keith Wood (wood.keith{at}optusnet.com.au) January 2008.
// 	Available under the MIT (http://keith-wood.name/licence.html) license.
// 	Please attribute the author if you use it. */
//
// (function($) { // Hide scope, no $ conflict
//     'use strict';
//
//     var pluginName = 'countdown';
//
//     var Y = 0; // Years
//     var O = 1; // Months
//     var W = 2; // Weeks
//     var D = 3; // Days
//     var H = 4; // Hours
//     var M = 5; // Minutes
//     var S = 6; // Seconds
//
//     /** Create the countdown plugin.
//      <p>Sets an element to show the time remaining until a given instant.</p>
//      <p>Expects HTML like:</p>
//      <pre>&lt;div>&lt;/div></pre>
//      <p>Provide inline configuration like:</p>
//      <pre>&lt;div data-countdown="name: 'value', ...">&lt;/div></pre>
//      @module Countdown
//      @augments JQPlugin
//      @example $(selector).countdown({until: +300}) */
//     $.JQPlugin.createPlugin({
//
//         /** The name of the plugin.
//          @default 'countdown' */
//         name: pluginName,
//
//         /** Countdown expiry callback.
//          Used with the {@linkcode module:Countdown~defaultOptions|onExpiry} option and
//          triggered when the countdown expires.
//          @global
//          @callback CountdownExpiryCallback
//          @this <code>Element</code>
//          @example onExpiry: function() {
//   alert('Done');
// } */
//
//         /** Countdown server synchronisation callback.
//          Used with the {@linkcode module:Countdown~defaultOptions|serverSync} option and
//          triggered when the countdown is initialised.
//          @global
//          @callback CountdownServerSyncCallback
//          @return {Date} The current date/time on the server as expressed in the local timezone.
//          @this <code>$.countdown</code>
//          @example serverSync: function() {
//   var time = null;
//   $.ajax({url: 'http://myserver.com/serverTime.php',
//     async: false, dataType: 'text',
//     success: function(text) {
//       time = new Date(text);
//     }, error: function(http, message, exc) {
//       time = new Date();
//   });
//   return time;
// } */
//
//         /** Countdown tick callback.
//          Used with the {@linkcode module:Countdown~defaultOptions|onTick} option and
//          triggered on every {@linkcode module:Countdown~defaultOptions|tickInterval} ticks of the countdown.
//          @global
//          @callback CountdownTickCallback
//          @this <code>Element</code>
//          @param {number[]} periods The breakdown by period (years, months, weeks, days,
//          hours, minutes, seconds) of the time remaining/passed.
//          @example onTick: function(periods) {
//   $('#altTime').text(periods[4] + ':' + twoDigits(periods[5]) +
//     ':' + twoDigits(periods[6]));
// } */
//
//         /** Countdown which labels callback.
//          Used with the {@linkcode module:Countdown~regionalOptions|whichLabels} option and
//          triggered when the countdown is being display to determine which set of labels
//          (<code>labels</code>, <code>labels1</code>, ...) are to be used for the current period value.
//          @global
//          @callback CountdownWhichLabelsCallback
//          @param {number} num The current period value.
//          @return {number} The suffix for the label set to use, or zero for the default labels.
//          @example whichLabels: function(num) {
//   return (num === 1 ? 1 : (num >= 2 && num <= 4 ? 2 : 0));
// } */
//
//         /** Default settings for the plugin.
//          @property {Date|number|string} [until] The date/time to count down to, or number of seconds
//          offset from now, or string of amounts and units for offset(s) from now:
//          'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
//          One of <code>until</code> or <code>since</code> must be specified.
//          If both are given <code>since</code> takes precedence.
//          @example until: new Date(2013, 12-1, 25, 13, 30)
//          until: +300
//          until: '+1O -2D'
//          @property {Date|number|string} [since] The date/time to count up from, or number of seconds
//          offset from now, or string of amounts and units for offset(s) from now:
//          'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
//          One of <code>until</code> or <code>since</code> must be specified.
//          If both are given <code>since</code> takes precedence.
//          @example since: new Date(2013, 1-1, 1)
//          since: -300
//          since: '-1O +2D'
//          @property {number} [timezone=null] The timezone (hours or minutes from GMT) for the target times,
//          or <code>null</code> for client local timezone.
//          @example timezone: +10
//          timezone: -60
//          @property {CountdownServerSyncCallback} [serverSync=null] A function to retrieve the current server time
//          for synchronisation.
//          @property {string} [format='dHMS'] The format for display - upper case to always show,
//          lower case to show only if non-zero,
//          'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
//          @property {string} [layout=''] <p>Build your own layout for the countdown.</p>
//          <p>Indicate substitution points with '{desc}' for the description, '{sep}' for the time separator,
//          '{pv}' where p is 'y' for years, 'o' for months, 'w' for weeks, 'd' for days,
//          'h' for hours, 'm' for minutes, or 's' for seconds and v is 'n' for the period value,
//          'nn' for the period value with a minimum of two digits,
//          'nnn' for the period value with a minimum of three digits, or
//          'l' for the period label (long or short form depending on the compact setting), or
//          '{pd}' where p is as above and d is '1' for the units digit, '10' for the tens digit,
//          '100' for the hundreds digit, or '1000' for the thousands digit.</p>
//          <p>If you need to exclude entire sections when the period value is zero and
//          you have specified the period as optional, surround these sections with
//          '{p<}' and '{p>}', where p is the same as above.</p>
//          <p>Your layout can just be simple text, or can contain HTML markup as well.</p>
//          @example layout: '{d<}{dn} {dl}{d>} {hnn}:{mnn}:{snn}'
//          @property {boolean} [compact=false] <code>true</code> to display in a compact format,
//          <code>false</code> for an expanded one.
//          @property {boolean} [padZeroes=false] <code>true</code> to add leading zeroes.
//          @property {number} [significant=0] The maximum number of periods with non-zero values to show, zero for all.
//          @property {string} [description=''] The description displayed for the countdown.
//          @property {string} [expiryUrl=''] A URL to load upon expiry, replacing the current page.
//          @property {string} [expiryText=''] Text to display upon expiry, replacing the countdown. This may be HTML.
//          @property {boolean} [alwaysExpire=false] <code>true</code> to trigger <code>onExpiry</code>
//          even if the target time has passed.
//          @property {CountdownExpiryCallback} [onExpiry=null] Callback when the countdown expires -
//          receives no parameters and <code>this</code> is the containing element.
//          @example onExpiry: function() {
//   ...
// }
//          @property {CountdownTickCallback} [onTick=null] Callback when the countdown is updated -
//          receives <code>number[7]</code> being the breakdown by period
//          (years, months, weeks, days, hours, minutes, seconds - based on
//          <code>format</code>) and <code>this</code> is the containing element.
//          @example onTick: function(periods) {
//   var secs = $.countdown.periodsToSeconds(periods);
//   if (secs < 300) { // Last five minutes
//     ...
//   }
// }
//          @property {number} [tickInterval=1] The interval (seconds) between <code>onTick</code> callbacks. */
//         defaultOptions: {
//             until: null,
//             since: null,
//             timezone: null,
//             serverSync: null,
//             format: 'dHMS',
//             layout: '',
//             compact: false,
//             padZeroes: false,
//             significant: 0,
//             description: '',
//             expiryUrl: '',
//             expiryText: '',
//             alwaysExpire: false,
//             onExpiry: null,
//             onTick: null,
//             tickInterval: 1
//         },
//
//         /** Localisations for the plugin.
//          Entries are objects indexed by the language code ('' being the default US/English).
//          Each object has the following attributes.
//          @property {string[]} [labels=['Years','Months','Weeks','Days','Hours','Minutes','Seconds']]
//          The display texts for the counter periods.
//          @property {string[]} [labels1=['Year','Month','Week','Day','Hour','Minute','Second']]
//          The display texts for the counter periods if they have a value of 1.
//          Add other <code>labels<em>n</em></code> attributes as necessary to
//          cater for other numeric idiosyncrasies of the localisation.
//          @property {string[]}[compactLabels=['y','m','w','d']] The compact texts for the counter periods.
//          @property {CountdownWhichLabelsCallback} [whichLabels=null] A function to determine which
//          <code>labels<em>n</em></code> to use.
//          @example whichLabels: function(num) {
//   return (num > 1 ? 0 : 1);
// }
//          @property {string[]} [digits=['0','1',...,'9']] The digits to display (0-9).
//          @property {string} [timeSeparator=':'] Separator for time periods in the compact layout.
//          @property {boolean} [isRTL=false] <code>true</code> for right-to-left languages,
//          <code>false</code> for left-to-right. */
//         regionalOptions: { // Available regional settings, indexed by language/country code
//             '': { // Default regional settings - English/US
//                 labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
//                 labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
//                 compactLabels: ['y', 'm', 'w', 'd'],
//                 whichLabels: null,
//                 digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
//                 timeSeparator: ':',
//                 isRTL: false
//             }
//         },
//
//         /* Class name for the right-to-left marker. */
//         _rtlClass: pluginName + '-rtl',
//         /* Class name for the countdown section marker. */
//         _sectionClass: pluginName + '-section',
//         /* Class name for the period amount marker. */
//         _amountClass: pluginName + '-amount',
//         /* Class name for the period name marker. */
//         _periodClass: pluginName + '-period',
//         /* Class name for the countdown row marker. */
//         _rowClass: pluginName + '-row',
//         /* Class name for the holding countdown marker. */
//         _holdingClass: pluginName + '-holding',
//         /* Class name for the showing countdown marker. */
//         _showClass: pluginName + '-show',
//         /* Class name for the description marker. */
//         _descrClass: pluginName + '-descr',
//
//         /* List of currently active countdown elements. */
//         _timerElems: [],
//
//         /** Additional setup for the countdown.
//          Apply default localisations.
//          Create the timer.
//          @private */
//         _init: function() {
//             var self = this;
//             this._super();
//             this._serverSyncs = [];
//             var now = (typeof Date.now === 'function' ? Date.now : function() { return new Date().getTime(); });
//             var perfAvail = (window.performance && typeof window.performance.now === 'function');
//             // Shared timer for all countdowns
//             function timerCallBack(timestamp) {
//                 var drawStart = (timestamp < 1e12 ? // New HTML5 high resolution timer
//                     (perfAvail ? (window.performance.now() + window.performance.timing.navigationStart) : now()) :
//                     // Integer milliseconds since unix epoch
//                     timestamp || now());
//                 if (drawStart - animationStartTime >= 1000) {
//                     self._updateElems();
//                     animationStartTime = drawStart;
//                 }
//                 requestAnimationFrame(timerCallBack);
//             }
//             var requestAnimationFrame = window.requestAnimationFrame ||
//                 window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
//                 window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
//             // This is when we expect a fall-back to setInterval as it's much more fluid
//             var animationStartTime = 0;
//             if (!requestAnimationFrame || $.noRequestAnimationFrame) {
//                 $.noRequestAnimationFrame = null;
//                 // Fall back to good old setInterval
//                 $.countdown._timer = setInterval(function() { self._updateElems(); }, 1000);
//             }
//             else {
//                 animationStartTime = window.animationStartTime ||
//                     window.webkitAnimationStartTime || window.mozAnimationStartTime ||
//                     window.oAnimationStartTime || window.msAnimationStartTime || now();
//                 requestAnimationFrame(timerCallBack);
//             }
//         },
//
//         /** Convert a date/time to UTC.
//          @param {number} tz The hour or minute offset from GMT, e.g. +9, -360.
//          @param {Date|number} year the date/time in that timezone or the year in that timezone.
//          @param {number} [month] The month (0 - 11) (omit if <code>year</code> is a <code>Date</code>).
//          @param {number} [day] The day (omit if <code>year</code> is a <code>Date</code>).
//          @param {number} [hours] The hour (omit if <code>year</code> is a <code>Date</code>).
//          @param {number} [mins] The minute (omit if <code>year</code> is a <code>Date</code>).
//          @param {number} [secs] The second (omit if <code>year</code> is a <code>Date</code>).
//          @param {number} [ms] The millisecond (omit if <code>year</code> is a <code>Date</code>).
//          @return {Date} The equivalent UTC date/time.
//          @example $.countdown.UTCDate(+10, 2013, 12-1, 25, 12, 0)
//          $.countdown.UTCDate(-7, new Date(2013, 12-1, 25, 12, 0)) */
//         UTCDate: function(tz, year, month, day, hours, mins, secs, ms) {
//             if (typeof year === 'object' && year instanceof Date) {
//                 ms = year.getMilliseconds();
//                 secs = year.getSeconds();
//                 mins = year.getMinutes();
//                 hours = year.getHours();
//                 day = year.getDate();
//                 month = year.getMonth();
//                 year = year.getFullYear();
//             }
//             var d = new Date();
//             d.setUTCFullYear(year);
//             d.setUTCDate(1);
//             d.setUTCMonth(month || 0);
//             d.setUTCDate(day || 1);
//             d.setUTCHours(hours || 0);
//             d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? tz * 60 : tz));
//             d.setUTCSeconds(secs || 0);
//             d.setUTCMilliseconds(ms || 0);
//             return d;
//         },
//
//         /** Convert a set of periods into seconds.
//          Averaged for months and years.
//          @param {number[]} periods The periods per year/month/week/day/hour/minute/second.
//          @return {number} The corresponding number of seconds.
//          @example var secs = $.countdown.periodsToSeconds(periods) */
//         periodsToSeconds: function(periods) {
//             return periods[0] * 31557600 + periods[1] * 2629800 + periods[2] * 604800 +
//                 periods[3] * 86400 + periods[4] * 3600 + periods[5] * 60 + periods[6];
//         },
//
//         /** Resynchronise the countdowns with the server.
//          @example $.countdown.resync() */
//         resync: function() {
//             var self = this;
//             $('.' + this._getMarker()).each(function() { // Each countdown
//                 var inst = $.data(this, self.name);
//                 if (inst.options.serverSync) { // If synced
//                     var serverSync = null;
//                     for (var i = 0; i < self._serverSyncs.length; i++) {
//                         if (self._serverSyncs[i][0] === inst.options.serverSync) { // Find sync details
//                             serverSync = self._serverSyncs[i];
//                             break;
//                         }
//                     }
//                     if (self._eqNull(serverSync[2])) { // Recalculate if missing
//                         var serverResult = ($.isFunction(inst.options.serverSync) ?
//                             inst.options.serverSync.apply(this, []) : null);
//                         serverSync[2] =
//                             (serverResult ? new Date().getTime() - serverResult.getTime() : 0) - serverSync[1];
//                     }
//                     if (inst._since) { // Apply difference
//                         inst._since.setMilliseconds(inst._since.getMilliseconds() + serverSync[2]);
//                     }
//                     inst._until.setMilliseconds(inst._until.getMilliseconds() + serverSync[2]);
//                 }
//             });
//             for (var i = 0; i < self._serverSyncs.length; i++) { // Update sync details
//                 if (!self._eqNull(self._serverSyncs[i][2])) {
//                     self._serverSyncs[i][1] += self._serverSyncs[i][2];
//                     delete self._serverSyncs[i][2];
//                 }
//             }
//         },
//
//         _instSettings: function(elem, options) { // jshint unused:false
//             return {_periods: [0, 0, 0, 0, 0, 0, 0]};
//         },
//
//         /** Add an element to the list of active ones.
//          @private
//          @param {Element} elem The countdown element. */
//         _addElem: function(elem) {
//             if (!this._hasElem(elem)) {
//                 this._timerElems.push(elem);
//             }
//         },
//
//         /** See if an element is in the list of active ones.
//          @private
//          @param {Element} elem The countdown element.
//          @return {boolean} <code>true</code> if present, <code>false</code> if not. */
//         _hasElem: function(elem) {
//             return ($.inArray(elem, this._timerElems) > -1);
//         },
//
//         /** Remove an element from the list of active ones.
//          @private
//          @param {Element} elem The countdown element. */
//         _removeElem: function(elem) {
//             this._timerElems = $.map(this._timerElems,
//                 function(value) { return (value === elem ? null : value); }); // delete entry
//         },
//
//         /** Update each active timer element.
//          @private */
//         _updateElems: function() {
//             for (var i = this._timerElems.length - 1; i >= 0; i--) {
//                 this._updateCountdown(this._timerElems[i]);
//             }
//         },
//
//         _optionsChanged: function(elem, inst, options) {
//             if (options.layout) {
//                 options.layout = options.layout.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
//             }
//             this._resetExtraLabels(inst.options, options);
//             var timezoneChanged = (inst.options.timezone !== options.timezone);
//             $.extend(inst.options, options);
//             this._adjustSettings(elem, inst,
//                 !this._eqNull(options.until) || !this._eqNull(options.since) || timezoneChanged);
//             var now = new Date();
//             if ((inst._since && inst._since < now) || (inst._until && inst._until > now)) {
//                 this._addElem(elem[0]);
//             }
//             this._updateCountdown(elem, inst);
//         },
//
//         /** Redisplay the countdown with an updated display.
//          @private
//          @param {Element|$J} elem The containing element.
//          @param {object} inst The current settings for this instance. */
//         _updateCountdown: function(elem, inst) {
//             elem = elem.jquery ? elem : $(elem);
//             inst = inst || this._getInst(elem);
//             if (!inst) {
//                 return;
//             }
//             elem.html(this._generateHTML(inst)).toggleClass(this._rtlClass, inst.options.isRTL);
//             if (inst._hold !== 'pause' && $.isFunction(inst.options.onTick)) {
//                 var periods = inst._hold !== 'lap' ? inst._periods :
//                     this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
//                 if (inst.options.tickInterval === 1 ||
//                     this.periodsToSeconds(periods) % inst.options.tickInterval === 0) {
//                     inst.options.onTick.apply(elem[0], [periods]);
//                 }
//             }
//             var expired = inst._hold !== 'pause' &&
//                 (inst._since ? inst._now.getTime() < inst._since.getTime() :
//                     inst._now.getTime() >= inst._until.getTime());
//             if (expired && !inst._expiring) {
//                 inst._expiring = true;
//                 if (this._hasElem(elem[0]) || inst.options.alwaysExpire) {
//                     this._removeElem(elem[0]);
//                     if ($.isFunction(inst.options.onExpiry)) {
//                         inst.options.onExpiry.apply(elem[0], []);
//                     }
//                     if (inst.options.expiryText) {
//                         var layout = inst.options.layout;
//                         inst.options.layout = inst.options.expiryText;
//                         this._updateCountdown(elem[0], inst);
//                         inst.options.layout = layout;
//                     }
//                     if (inst.options.expiryUrl) {
//                         window.location = inst.options.expiryUrl;
//                     }
//                 }
//                 inst._expiring = false;
//             }
//             else if (inst._hold === 'pause') {
//                 this._removeElem(elem[0]);
//             }
//         },
//
//         /** Reset any extra labelsn and compactLabelsn entries if changing labels.
//          @private
//          @param {object} base The options to be updated.
//          @param {object} options The new option values. */
//         _resetExtraLabels: function(base, options) {
//             var n = null;
//             for (n in options) {
//                 if (n.match(/[Ll]abels[02-9]|compactLabels1/)) {
//                     base[n] = options[n];
//                 }
//             }
//             for (n in base) { // Remove custom numbered labels
//                 if (n.match(/[Ll]abels[02-9]|compactLabels1/) && typeof options[n] === 'undefined') {
//                     base[n] = null;
//                 }
//             }
//         },
//
//         /** Determine whether or not a value is equivalent to <code>null</code>.
//          @private
//          @param {object} value The value to test.
//          @return {boolean} <code>true</code> if equivalent to <code>null</code>, <code>false</code> if not. */
//         _eqNull: function(value) {
//             return typeof value === 'undefined' || value === null;
//         },
//
//
//         /** Calculate internal settings for an instance.
//          @private
//          @param {$J} elem The containing element.
//          @param {object} inst The current settings for this instance.
//          @param {boolean} recalc <code>true</code> if until or since are set. */
//         _adjustSettings: function(elem, inst, recalc) {
//             var serverEntry = null;
//             for (var i = 0; i < this._serverSyncs.length; i++) {
//                 if (this._serverSyncs[i][0] === inst.options.serverSync) {
//                     serverEntry = this._serverSyncs[i][1];
//                     break;
//                 }
//             }
//             var now = null;
//             var serverOffset = null;
//             if (!this._eqNull(serverEntry)) {
//                 now = new Date();
//                 serverOffset = (inst.options.serverSync ? serverEntry : 0);
//             }
//             else {
//                 var serverResult = ($.isFunction(inst.options.serverSync) ?
//                     inst.options.serverSync.apply(elem[0], []) : null);
//                 now = new Date();
//                 serverOffset = (serverResult ? now.getTime() - serverResult.getTime() : 0);
//                 this._serverSyncs.push([inst.options.serverSync, serverOffset]);
//             }
//             var timezone = inst.options.timezone;
//             timezone = (this._eqNull(timezone) ? -now.getTimezoneOffset() : timezone);
//             if (recalc || (!recalc && this._eqNull(inst._until) && this._eqNull(inst._since))) {
//                 inst._since = inst.options.since;
//                 if (!this._eqNull(inst._since)) {
//                     inst._since = this.UTCDate(timezone, this._determineTime(inst._since, null));
//                     if (inst._since && serverOffset) {
//                         inst._since.setMilliseconds(inst._since.getMilliseconds() + serverOffset);
//                     }
//                 }
//                 inst._until = this.UTCDate(timezone, this._determineTime(inst.options.until, now));
//                 if (serverOffset) {
//                     inst._until.setMilliseconds(inst._until.getMilliseconds() + serverOffset);
//                 }
//             }
//             inst._show = this._determineShow(inst);
//         },
//
//         /** Remove the countdown widget from an element.
//          @private
//          @param {$J} elem The containing element.
//          @param {object} inst The current instance object. */
//         _preDestroy: function(elem, inst) { // jshint unused:false
//             this._removeElem(elem[0]);
//             elem.empty();
//         },
//
//         /** Pause a countdown widget at the current time.
//          Stop it running but remember and display the current time.
//          @param {Element} elem The containing element.
//          @example $(selector).countdown('pause') */
//         pause: function(elem) {
//             this._hold(elem, 'pause');
//         },
//
//         /** Pause a countdown widget at the current time.
//          Stop the display but keep the countdown running.
//          @param {Element} elem The containing element.
//          @example $(selector).countdown('lap') */
//         lap: function(elem) {
//             this._hold(elem, 'lap');
//         },
//
//         /** Resume a paused countdown widget.
//          @param {Element} elem The containing element.
//          @example $(selector).countdown('resume') */
//         resume: function(elem) {
//             this._hold(elem, null);
//         },
//
//         /** Toggle a paused countdown widget.
//          @param {Element} elem The containing element.
//          @example $(selector).countdown('toggle') */
//         toggle: function(elem) {
//             var inst = $.data(elem, this.name) || {};
//             this[!inst._hold ? 'pause' : 'resume'](elem);
//         },
//
//         /** Toggle a lapped countdown widget.
//          @param {Element} elem The containing element.
//          @example $(selector).countdown('toggleLap') */
//         toggleLap: function(elem) {
//             var inst = $.data(elem, this.name) || {};
//             this[!inst._hold ? 'lap' : 'resume'](elem);
//         },
//
//         /** Pause or resume a countdown widget.
//          @private
//          @param {Element} elem The containing element.
//          @param {string} hold The new hold setting. */
//         _hold: function(elem, hold) {
//             var inst = $.data(elem, this.name);
//             if (inst) {
//                 if (inst._hold === 'pause' && !hold) {
//                     inst._periods = inst._savePeriods;
//                     var sign = (inst._since ? '-' : '+');
//                     inst[inst._since ? '_since' : '_until'] =
//                         this._determineTime(sign + inst._periods[0] + 'y' +
//                             sign + inst._periods[1] + 'o' + sign + inst._periods[2] + 'w' +
//                             sign + inst._periods[3] + 'd' + sign + inst._periods[4] + 'h' +
//                             sign + inst._periods[5] + 'm' + sign + inst._periods[6] + 's');
//                     this._addElem(elem);
//                 }
//                 inst._hold = hold;
//                 inst._savePeriods = (hold === 'pause' ? inst._periods : null);
//                 $.data(elem, this.name, inst);
//                 this._updateCountdown(elem, inst);
//             }
//         },
//
//         /** Return the current time periods, broken down by years, months, weeks, days, hours, minutes, and seconds.
//          @param {Element} elem The containing element.
//          @return {number[]} The current periods for the countdown.
//          @example var periods = $(selector).countdown('getTimes') */
//         getTimes: function(elem) {
//             var inst = $.data(elem, this.name);
//             return (!inst ? null : (inst._hold === 'pause' ? inst._savePeriods : (!inst._hold ? inst._periods :
//                 this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()))));
//         },
//
//         /** A time may be specified as an exact value or a relative one.
//          @private
//          @param {string|number|Date} setting The date/time value as a relative or absolute value.
//          @param {Date} defaultTime The date/time to use if no other is supplied.
//          @return {Date} The corresponding date/time. */
//         _determineTime: function(setting, defaultTime) {
//             var self = this;
//             var offsetNumeric = function(offset) { // e.g. +300, -2
//                 var time = new Date();
//                 time.setTime(time.getTime() + offset * 1000);
//                 return time;
//             };
//             var offsetString = function(offset) { // e.g. '+2d', '-4w', '+3h +30m'
//                 offset = offset.toLowerCase();
//                 var time = new Date();
//                 var year = time.getFullYear();
//                 var month = time.getMonth();
//                 var day = time.getDate();
//                 var hour = time.getHours();
//                 var minute = time.getMinutes();
//                 var second = time.getSeconds();
//                 var pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
//                 var matches = pattern.exec(offset);
//                 while (matches) {
//                     switch (matches[2] || 's') {
//                         case 's':
//                             second += parseInt(matches[1], 10);
//                             break;
//                         case 'm':
//                             minute += parseInt(matches[1], 10);
//                             break;
//                         case 'h':
//                             hour += parseInt(matches[1], 10);
//                             break;
//                         case 'd':
//                             day += parseInt(matches[1], 10);
//                             break;
//                         case 'w':
//                             day += parseInt(matches[1], 10) * 7;
//                             break;
//                         case 'o':
//                             month += parseInt(matches[1], 10);
//                             day = Math.min(day, self._getDaysInMonth(year, month));
//                             break;
//                         case 'y':
//                             year += parseInt(matches[1], 10);
//                             day = Math.min(day, self._getDaysInMonth(year, month));
//                             break;
//                     }
//                     matches = pattern.exec(offset);
//                 }
//                 return new Date(year, month, day, hour, minute, second, 0);
//             };
//             var time = (this._eqNull(setting) ? defaultTime :
//                 (typeof setting === 'string' ? offsetString(setting) :
//                     (typeof setting === 'number' ? offsetNumeric(setting) : setting)));
//             if (time) {
//                 time.setMilliseconds(0);
//             }
//             return time;
//         },
//
//         /** Determine the number of days in a month.
//          @private
//          @param {number} year The year.
//          @param {number} month The month.
//          @return {number} The days in that month. */
//         _getDaysInMonth: function(year, month) {
//             return 32 - new Date(year, month, 32).getDate();
//         },
//
//         /** Default implementation to determine which set of labels should be used for an amount.
//          Use the <code>labels</code> attribute with the same numeric suffix (if it exists).
//          @private
//          @param {number} num The amount to be displayed.
//          @return {number} The set of labels to be used for this amount. */
//         _normalLabels: function(num) {
//             return num;
//         },
//
//         /** Generate the HTML to display the countdown widget.
//          @private
//          @param {object} inst The current settings for this instance.
//          @return {string} The new HTML for the countdown display. */
//         _generateHTML: function(inst) {
//             var self = this;
//             // Determine what to show
//             inst._periods = (inst._hold ? inst._periods :
//                 this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()));
//             // Show all 'asNeeded' after first non-zero value
//             var shownNonZero = false;
//             var showCount = 0;
//             var sigCount = inst.options.significant;
//             var show = $.extend({}, inst._show);
//             var period = null;
//             for (period = Y; period <= S; period++) {
//                 shownNonZero = shownNonZero || (inst._show[period] === '?' && inst._periods[period] > 0);
//                 show[period] = (inst._show[period] === '?' && !shownNonZero ? null : inst._show[period]);
//                 showCount += (show[period] ? 1 : 0);
//                 sigCount -= (inst._periods[period] > 0 ? 1 : 0);
//             }
//             var showSignificant = [false, false, false, false, false, false, false];
//             for (period = S; period >= Y; period--) { // Determine significant periods
//                 if (inst._show[period]) {
//                     if (inst._periods[period]) {
//                         showSignificant[period] = true;
//                     }
//                     else {
//                         showSignificant[period] = sigCount > 0;
//                         sigCount--;
//                     }
//                 }
//             }
//             var labels = (inst.options.compact ? inst.options.compactLabels : inst.options.labels);
//             var whichLabels = inst.options.whichLabels || this._normalLabels;
//             var showCompact = function(period) {
//                 var labelsNum = inst.options['compactLabels' + whichLabels(inst._periods[period])];
//                 return (show[period] ? self._translateDigits(inst, inst._periods[period]) +
//                     (labelsNum ? labelsNum[period] : labels[period]) + ' ' : '');
//             };
//             var minDigits = (inst.options.padZeroes ? 2 : 1);
//             var showFull = function(period) {
//                 var labelsNum = inst.options['labels' + whichLabels(inst._periods[period])];
//                 return ((!inst.options.significant && show[period]) ||
//                 (inst.options.significant && showSignificant[period]) ?
//                     '<span class="' + self._sectionClass + '">' +
//                     '<span class="' + self._amountClass + '">' +
//                     self._minDigits(inst, inst._periods[period], minDigits) + '</span>' +
//                     '<span class="' + self._periodClass + '">' +
//                     (labelsNum ? labelsNum[period] : labels[period]) + '</span></span>' : '');
//             };
//             return (inst.options.layout ? this._buildLayout(inst, show, inst.options.layout,
//                 inst.options.compact, inst.options.significant, showSignificant) :
//                 ((inst.options.compact ? // Compact version
//                     '<span class="' + this._rowClass + ' ' + this._amountClass +
//                     (inst._hold ? ' ' + this._holdingClass : '') + '">' +
//                     showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) +
//                     (show[H] ? this._minDigits(inst, inst._periods[H], 2) : '') +
//                     (show[M] ? (show[H] ? inst.options.timeSeparator : '') +
//                         this._minDigits(inst, inst._periods[M], 2) : '') +
//                     (show[S] ? (show[H] || show[M] ? inst.options.timeSeparator : '') +
//                         this._minDigits(inst, inst._periods[S], 2) : '') :
//                     // Full version
//                     '<span class="' + this._rowClass + ' ' + this._showClass + (inst.options.significant || showCount) +
//                     (inst._hold ? ' ' + this._holdingClass : '') + '">' +
//                     showFull(Y) + showFull(O) + showFull(W) + showFull(D) +
//                     showFull(H) + showFull(M) + showFull(S)) + '</span>' +
//                     (inst.options.description ? '<span class="' + this._rowClass + ' ' + this._descrClass + '">' +
//                         inst.options.description + '</span>' : '')));
//         },
//
//         /** Construct a custom layout.
//          @private
//          @param {object} inst The current settings for this instance.
//          @param {boolean[]} show Flags indicating which periods are requested.
//          @param {string} layout The customised layout.
//          @param {boolean} compact <code>true</code> if using compact labels.
//          @param {number} significant The number of periods with values to show, zero for all.
//          @param {boolean[]} showSignificant Other periods to show for significance.
//          @return {string} The custom HTML. */
//         _buildLayout: function(inst, show, layout, compact, significant, showSignificant) {
//             var labels = inst.options[compact ? 'compactLabels' : 'labels'];
//             var whichLabels = inst.options.whichLabels || this._normalLabels;
//             var labelFor = function(index) {
//                 return (inst.options[(compact ? 'compactLabels' : 'labels') +
//                 whichLabels(inst._periods[index])] || labels)[index];
//             };
//             var digit = function(value, position) {
//                 return inst.options.digits[Math.floor(value / position) % 10];
//             };
//             var subs = {desc: inst.options.description, sep: inst.options.timeSeparator,
//                 yl: labelFor(Y), yn: this._minDigits(inst, inst._periods[Y], 1),
//                 ynn: this._minDigits(inst, inst._periods[Y], 2),
//                 ynnn: this._minDigits(inst, inst._periods[Y], 3), y1: digit(inst._periods[Y], 1),
//                 y10: digit(inst._periods[Y], 10), y100: digit(inst._periods[Y], 100),
//                 y1000: digit(inst._periods[Y], 1000),
//                 ol: labelFor(O), on: this._minDigits(inst, inst._periods[O], 1),
//                 onn: this._minDigits(inst, inst._periods[O], 2),
//                 onnn: this._minDigits(inst, inst._periods[O], 3), o1: digit(inst._periods[O], 1),
//                 o10: digit(inst._periods[O], 10), o100: digit(inst._periods[O], 100),
//                 o1000: digit(inst._periods[O], 1000),
//                 wl: labelFor(W), wn: this._minDigits(inst, inst._periods[W], 1),
//                 wnn: this._minDigits(inst, inst._periods[W], 2),
//                 wnnn: this._minDigits(inst, inst._periods[W], 3), w1: digit(inst._periods[W], 1),
//                 w10: digit(inst._periods[W], 10), w100: digit(inst._periods[W], 100),
//                 w1000: digit(inst._periods[W], 1000),
//                 dl: labelFor(D), dn: this._minDigits(inst, inst._periods[D], 1),
//                 dnn: this._minDigits(inst, inst._periods[D], 2),
//                 dnnn: this._minDigits(inst, inst._periods[D], 3), d1: digit(inst._periods[D], 1),
//                 d10: digit(inst._periods[D], 10), d100: digit(inst._periods[D], 100),
//                 d1000: digit(inst._periods[D], 1000),
//                 hl: labelFor(H), hn: this._minDigits(inst, inst._periods[H], 1),
//                 hnn: this._minDigits(inst, inst._periods[H], 2),
//                 hnnn: this._minDigits(inst, inst._periods[H], 3), h1: digit(inst._periods[H], 1),
//                 h10: digit(inst._periods[H], 10), h100: digit(inst._periods[H], 100),
//                 h1000: digit(inst._periods[H], 1000),
//                 ml: labelFor(M), mn: this._minDigits(inst, inst._periods[M], 1),
//                 mnn: this._minDigits(inst, inst._periods[M], 2),
//                 mnnn: this._minDigits(inst, inst._periods[M], 3), m1: digit(inst._periods[M], 1),
//                 m10: digit(inst._periods[M], 10), m100: digit(inst._periods[M], 100),
//                 m1000: digit(inst._periods[M], 1000),
//                 sl: labelFor(S), sn: this._minDigits(inst, inst._periods[S], 1),
//                 snn: this._minDigits(inst, inst._periods[S], 2),
//                 snnn: this._minDigits(inst, inst._periods[S], 3), s1: digit(inst._periods[S], 1),
//                 s10: digit(inst._periods[S], 10), s100: digit(inst._periods[S], 100),
//                 s1000: digit(inst._periods[S], 1000)};
//             var html = layout;
//             // Replace period containers: {p<}...{p>}
//             for (var i = Y; i <= S; i++) {
//                 var period = 'yowdhms'.charAt(i);
//                 var re = new RegExp('\\{' + period + '<\\}([\\s\\S]*)\\{' + period + '>\\}', 'g');
//                 html = html.replace(re, ((!significant && show[i]) ||
//                 (significant && showSignificant[i]) ? '$1' : ''));
//             }
//             // Replace period values: {pn}
//             $.each(subs, function(n, v) {
//                 var re = new RegExp('\\{' + n + '\\}', 'g');
//                 html = html.replace(re, v);
//             });
//             return html;
//         },
//
//         /** Ensure a numeric value has at least n digits for display.
//          @private
//          @param {object} inst The current settings for this instance.
//          @param {number} value The value to display.
//          @param {number} len The minimum length.
//          @return {string} The display text. */
//         _minDigits: function(inst, value, len) {
//             value = '' + value;
//             if (value.length >= len) {
//                 return this._translateDigits(inst, value);
//             }
//             value = '0000000000' + value;
//             return this._translateDigits(inst, value.substr(value.length - len));
//         },
//
//         /** Translate digits into other representations.
//          @private
//          @param {object} inst The current settings for this instance.
//          @param {string} value The text to translate.
//          @return {string} The translated text. */
//         _translateDigits: function(inst, value) {
//             return ('' + value).replace(/[0-9]/g, function(digit) {
//                 return inst.options.digits[digit];
//             });
//         },
//
//         /** Translate the format into flags for each period.
//          @private
//          @param {object} inst The current settings for this instance.
//          @return {string[]} Flags indicating which periods are requested (?) or
//          required (!) by year, month, week, day, hour, minute, second. */
//         _determineShow: function(inst) {
//             var format = inst.options.format;
//             var show = [];
//             show[Y] = (format.match('y') ? '?' : (format.match('Y') ? '!' : null));
//             show[O] = (format.match('o') ? '?' : (format.match('O') ? '!' : null));
//             show[W] = (format.match('w') ? '?' : (format.match('W') ? '!' : null));
//             show[D] = (format.match('d') ? '?' : (format.match('D') ? '!' : null));
//             show[H] = (format.match('h') ? '?' : (format.match('H') ? '!' : null));
//             show[M] = (format.match('m') ? '?' : (format.match('M') ? '!' : null));
//             show[S] = (format.match('s') ? '?' : (format.match('S') ? '!' : null));
//             return show;
//         },
//
//         /** Calculate the requested periods between now and the target time.
//          @private
//          @param {object} inst The current settings for this instance.
//          @param {string[]} show Flags indicating which periods are requested/required.
//          @param {number} significant The number of periods with values to show, zero for all.
//          @param {Date} now The current date and time.
//          @return {number[]} The current time periods (always positive)
//          by year, month, week, day, hour, minute, second. */
//         _calculatePeriods: function(inst, show, significant, now) {
//             // Find endpoints
//             inst._now = now;
//             inst._now.setMilliseconds(0);
//             var until = new Date(inst._now.getTime());
//             if (inst._since) {
//                 if (now.getTime() < inst._since.getTime()) {
//                     inst._now = now = until;
//                 }
//                 else {
//                     now = inst._since;
//                 }
//             }
//             else {
//                 until.setTime(inst._until.getTime());
//                 if (now.getTime() > inst._until.getTime()) {
//                     inst._now = now = until;
//                 }
//             }
//             // Calculate differences by period
//             var periods = [0, 0, 0, 0, 0, 0, 0];
//             if (show[Y] || show[O]) {
//                 // Treat end of months as the same
//                 var lastNow = this._getDaysInMonth(now.getFullYear(), now.getMonth());
//                 var lastUntil = this._getDaysInMonth(until.getFullYear(), until.getMonth());
//                 var sameDay = (until.getDate() === now.getDate() ||
//                     (until.getDate() >= Math.min(lastNow, lastUntil) &&
//                         now.getDate() >= Math.min(lastNow, lastUntil)));
//                 var getSecs = function(date) {
//                     return (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
//                 };
//                 var months = Math.max(0,
//                     (until.getFullYear() - now.getFullYear()) * 12 + until.getMonth() - now.getMonth() +
//                     ((until.getDate() < now.getDate() && !sameDay) ||
//                     (sameDay && getSecs(until) < getSecs(now)) ? -1 : 0));
//                 periods[Y] = (show[Y] ? Math.floor(months / 12) : 0);
//                 periods[O] = (show[O] ? months - periods[Y] * 12 : 0);
//                 // Adjust for months difference and end of month if necessary
//                 now = new Date(now.getTime());
//                 var wasLastDay = (now.getDate() === lastNow);
//                 var lastDay = this._getDaysInMonth(now.getFullYear() + periods[Y],
//                     now.getMonth() + periods[O]);
//                 if (now.getDate() > lastDay) {
//                     now.setDate(lastDay);
//                 }
//                 now.setFullYear(now.getFullYear() + periods[Y]);
//                 now.setMonth(now.getMonth() + periods[O]);
//                 if (wasLastDay) {
//                     now.setDate(lastDay);
//                 }
//             }
//             var diff = Math.floor((until.getTime() - now.getTime()) / 1000);
//             var period = null;
//             var extractPeriod = function(period, numSecs) {
//                 periods[period] = (show[period] ? Math.floor(diff / numSecs) : 0);
//                 diff -= periods[period] * numSecs;
//             };
//             extractPeriod(W, 604800);
//             extractPeriod(D, 86400);
//             extractPeriod(H, 3600);
//             extractPeriod(M, 60);
//             extractPeriod(S, 1);
//             if (diff > 0 && !inst._since) { // Round up if left overs
//                 var multiplier = [1, 12, 4.3482, 7, 24, 60, 60];
//                 var lastShown = S;
//                 var max = 1;
//                 for (period = S; period >= Y; period--) {
//                     if (show[period]) {
//                         if (periods[lastShown] >= max) {
//                             periods[lastShown] = 0;
//                             diff = 1;
//                         }
//                         if (diff > 0) {
//                             periods[period]++;
//                             diff = 0;
//                             lastShown = period;
//                             max = 1;
//                         }
//                     }
//                     max *= multiplier[period];
//                 }
//             }
//             if (significant) { // Zero out insignificant periods
//                 for (period = Y; period <= S; period++) {
//                     if (significant && periods[period]) {
//                         significant--;
//                     }
//                     else if (!significant) {
//                         periods[period] = 0;
//                     }
//                 }
//             }
//             return periods;
//         }
//     });
//
// })($J);
//
// /* http://keith-wood.name/countdown.html
//    Korean initialisation for the $J countdown extension
//    Written by Ryan Yu (ryanyu79@gmail.com). */
// (function($) {
//     'use strict';
//     $.countdown.regionalOptions.ko = {
//         labels: ['년','월','주','일','시','분','초'],
//         labels1: ['년','월','주','일','시','분','초'],
//         compactLabels: ['년','월','주','일'],
//         compactLabels1: ['년','월','주','일'],
//         whichLabels: null,
//         digits: ['0','1','2','3','4','5','6','7','8','9'],
//         timeSeparator: ':',
//         isRTL: false
//     };
//     $.countdown.setDefaults($.countdown.regionalOptions.ko);
// })($J);
//
// /*!
//  * imagesLoaded PACKAGED v3.1.8
//  * JavaScript is all like "You images are done yet or what?"
//  * MIT License
//  */
//
//
// /*!
//  * EventEmitter v4.2.6 - git.io/ee
//  * Oliver Caldwell
//  * MIT license
//  * @preserve
//  */
//
// (function () {
//
//
//     /**
//      * Class for managing events.
//      * Can be extended to provide event functionality in other classes.
//      *
//      * @class EventEmitter Manages event registering and emitting.
//      */
//     function EventEmitter() {}
//
//     // Shortcuts to improve speed and size
//     var proto = EventEmitter.prototype;
//     var exports = this;
//     var originalGlobalValue = exports.EventEmitter;
//
//     /**
//      * Finds the index of the listener for the event in it's storage array.
//      *
//      * @param {Function[]} listeners Array of listeners to search through.
//      * @param {Function} listener Method to look for.
//      * @return {Number} Index of the specified listener, -1 if not found
//      * @api private
//      */
//     function indexOfListener(listeners, listener) {
//         var i = listeners.length;
//         while (i--) {
//             if (listeners[i].listener === listener) {
//                 return i;
//             }
//         }
//
//         return -1;
//     }
//
//     /**
//      * Alias a method while keeping the context correct, to allow for overwriting of target method.
//      *
//      * @param {String} name The name of the target method.
//      * @return {Function} The aliased method
//      * @api private
//      */
//     function alias(name) {
//         return function aliasClosure() {
//             return this[name].apply(this, arguments);
//         };
//     }
//
//     /**
//      * Returns the listener array for the specified event.
//      * Will initialise the event object and listener arrays if required.
//      * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
//      * Each property in the object response is an array of listener functions.
//      *
//      * @param {String|RegExp} evt Name of the event to return the listeners from.
//      * @return {Function[]|Object} All listener functions for the event.
//      */
//     proto.getListeners = function getListeners(evt) {
//         var events = this._getEvents();
//         var response;
//         var key;
//
//         // Return a concatenated array of all matching events if
//         // the selector is a regular expression.
//         if (typeof evt === 'object') {
//             response = {};
//             for (key in events) {
//                 if (events.hasOwnProperty(key) && evt.test(key)) {
//                     response[key] = events[key];
//                 }
//             }
//         }
//         else {
//             response = events[evt] || (events[evt] = []);
//         }
//
//         return response;
//     };
//
//     /**
//      * Takes a list of listener objects and flattens it into a list of listener functions.
//      *
//      * @param {Object[]} listeners Raw listener objects.
//      * @return {Function[]} Just the listener functions.
//      */
//     proto.flattenListeners = function flattenListeners(listeners) {
//         var flatListeners = [];
//         var i;
//
//         for (i = 0; i < listeners.length; i += 1) {
//             flatListeners.push(listeners[i].listener);
//         }
//
//         return flatListeners;
//     };
//
//     /**
//      * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
//      *
//      * @param {String|RegExp} evt Name of the event to return the listeners from.
//      * @return {Object} All listener functions for an event in an object.
//      */
//     proto.getListenersAsObject = function getListenersAsObject(evt) {
//         var listeners = this.getListeners(evt);
//         var response;
//
//         if (listeners instanceof Array) {
//             response = {};
//             response[evt] = listeners;
//         }
//
//         return response || listeners;
//     };
//
//     /**
//      * Adds a listener function to the specified event.
//      * The listener will not be added if it is a duplicate.
//      * If the listener returns true then it will be removed after it is called.
//      * If you pass a regular expression as the event name then the listener will be added to all events that match it.
//      *
//      * @param {String|RegExp} evt Name of the event to attach the listener to.
//      * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.addListener = function addListener(evt, listener) {
//         var listeners = this.getListenersAsObject(evt);
//         var listenerIsWrapped = typeof listener === 'object';
//         var key;
//
//         for (key in listeners) {
//             if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
//                 listeners[key].push(listenerIsWrapped ? listener : {
//                     listener: listener,
//                     once: false
//                 });
//             }
//         }
//
//         return this;
//     };
//
//     /**
//      * Alias of addListener
//      */
//     proto.on = alias('addListener');
//
//     /**
//      * Semi-alias of addListener. It will add a listener that will be
//      * automatically removed after it's first execution.
//      *
//      * @param {String|RegExp} evt Name of the event to attach the listener to.
//      * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.addOnceListener = function addOnceListener(evt, listener) {
//         return this.addListener(evt, {
//             listener: listener,
//             once: true
//         });
//     };
//
//     /**
//      * Alias of addOnceListener.
//      */
//     proto.once = alias('addOnceListener');
//
//     /**
//      * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
//      * You need to tell it what event names should be matched by a regex.
//      *
//      * @param {String} evt Name of the event to create.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.defineEvent = function defineEvent(evt) {
//         this.getListeners(evt);
//         return this;
//     };
//
//     /**
//      * Uses defineEvent to define multiple events.
//      *
//      * @param {String[]} evts An array of event names to define.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.defineEvents = function defineEvents(evts) {
//         for (var i = 0; i < evts.length; i += 1) {
//             this.defineEvent(evts[i]);
//         }
//         return this;
//     };
//
//     /**
//      * Removes a listener function from the specified event.
//      * When passed a regular expression as the event name, it will remove the listener from all events that match it.
//      *
//      * @param {String|RegExp} evt Name of the event to remove the listener from.
//      * @param {Function} listener Method to remove from the event.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.removeListener = function removeListener(evt, listener) {
//         var listeners = this.getListenersAsObject(evt);
//         var index;
//         var key;
//
//         for (key in listeners) {
//             if (listeners.hasOwnProperty(key)) {
//                 index = indexOfListener(listeners[key], listener);
//
//                 if (index !== -1) {
//                     listeners[key].splice(index, 1);
//                 }
//             }
//         }
//
//         return this;
//     };
//
//     /**
//      * Alias of removeListener
//      */
//     proto.off = alias('removeListener');
//
//     /**
//      * Adds listeners in bulk using the manipulateListeners method.
//      * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
//      * You can also pass it a regular expression to add the array of listeners to all events that match it.
//      * Yeah, this function does quite a bit. That's probably a bad thing.
//      *
//      * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
//      * @param {Function[]} [listeners] An optional array of listener functions to add.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.addListeners = function addListeners(evt, listeners) {
//         // Pass through to manipulateListeners
//         return this.manipulateListeners(false, evt, listeners);
//     };
//
//     /**
//      * Removes listeners in bulk using the manipulateListeners method.
//      * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
//      * You can also pass it an event name and an array of listeners to be removed.
//      * You can also pass it a regular expression to remove the listeners from all events that match it.
//      *
//      * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
//      * @param {Function[]} [listeners] An optional array of listener functions to remove.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.removeListeners = function removeListeners(evt, listeners) {
//         // Pass through to manipulateListeners
//         return this.manipulateListeners(true, evt, listeners);
//     };
//
//     /**
//      * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
//      * The first argument will determine if the listeners are removed (true) or added (false).
//      * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
//      * You can also pass it an event name and an array of listeners to be added/removed.
//      * You can also pass it a regular expression to manipulate the listeners of all events that match it.
//      *
//      * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
//      * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
//      * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
//         var i;
//         var value;
//         var single = remove ? this.removeListener : this.addListener;
//         var multiple = remove ? this.removeListeners : this.addListeners;
//
//         // If evt is an object then pass each of it's properties to this method
//         if (typeof evt === 'object' && !(evt instanceof RegExp)) {
//             for (i in evt) {
//                 if (evt.hasOwnProperty(i) && (value = evt[i])) {
//                     // Pass the single listener straight through to the singular method
//                     if (typeof value === 'function') {
//                         single.call(this, i, value);
//                     }
//                     else {
//                         // Otherwise pass back to the multiple function
//                         multiple.call(this, i, value);
//                     }
//                 }
//             }
//         }
//         else {
//             // So evt must be a string
//             // And listeners must be an array of listeners
//             // Loop over it and pass each one to the multiple method
//             i = listeners.length;
//             while (i--) {
//                 single.call(this, evt, listeners[i]);
//             }
//         }
//
//         return this;
//     };
//
//     /**
//      * Removes all listeners from a specified event.
//      * If you do not specify an event then all listeners will be removed.
//      * That means every event will be emptied.
//      * You can also pass a regex to remove all events that match it.
//      *
//      * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.removeEvent = function removeEvent(evt) {
//         var type = typeof evt;
//         var events = this._getEvents();
//         var key;
//
//         // Remove different things depending on the state of evt
//         if (type === 'string') {
//             // Remove all listeners for the specified event
//             delete events[evt];
//         }
//         else if (type === 'object') {
//             // Remove all events matching the regex.
//             for (key in events) {
//                 if (events.hasOwnProperty(key) && evt.test(key)) {
//                     delete events[key];
//                 }
//             }
//         }
//         else {
//             // Remove all listeners in all events
//             delete this._events;
//         }
//
//         return this;
//     };
//
//     /**
//      * Alias of removeEvent.
//      *
//      * Added to mirror the node API.
//      */
//     proto.removeAllListeners = alias('removeEvent');
//
//     /**
//      * Emits an event of your choice.
//      * When emitted, every listener attached to that event will be executed.
//      * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
//      * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
//      * So they will not arrive within the array on the other side, they will be separate.
//      * You can also pass a regular expression to emit to all events that match it.
//      *
//      * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
//      * @param {Array} [args] Optional array of arguments to be passed to each listener.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.emitEvent = function emitEvent(evt, args) {
//         var listeners = this.getListenersAsObject(evt);
//         var listener;
//         var i;
//         var key;
//         var response;
//
//         for (key in listeners) {
//             if (listeners.hasOwnProperty(key)) {
//                 i = listeners[key].length;
//
//                 while (i--) {
//                     // If the listener returns true then it shall be removed from the event
//                     // The function is executed either with a basic call or an apply if there is an args array
//                     listener = listeners[key][i];
//
//                     if (listener.once === true) {
//                         this.removeListener(evt, listener.listener);
//                     }
//
//                     response = listener.listener.apply(this, args || []);
//
//                     if (response === this._getOnceReturnValue()) {
//                         this.removeListener(evt, listener.listener);
//                     }
//                 }
//             }
//         }
//
//         return this;
//     };
//
//     /**
//      * Alias of emitEvent
//      */
//     proto.trigger = alias('emitEvent');
//
//     /**
//      * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
//      * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
//      *
//      * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
//      * @param {...*} Optional additional arguments to be passed to each listener.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.emit = function emit(evt) {
//         var args = Array.prototype.slice.call(arguments, 1);
//         return this.emitEvent(evt, args);
//     };
//
//     /**
//      * Sets the current value to check against when executing listeners. If a
//      * listeners return value matches the one set here then it will be removed
//      * after execution. This value defaults to true.
//      *
//      * @param {*} value The new value to check for when executing listeners.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.setOnceReturnValue = function setOnceReturnValue(value) {
//         this._onceReturnValue = value;
//         return this;
//     };
//
//     /**
//      * Fetches the current value to check against when executing listeners. If
//      * the listeners return value matches this one then it should be removed
//      * automatically. It will return true by default.
//      *
//      * @return {*|Boolean} The current value to check for or the default, true.
//      * @api private
//      */
//     proto._getOnceReturnValue = function _getOnceReturnValue() {
//         if (this.hasOwnProperty('_onceReturnValue')) {
//             return this._onceReturnValue;
//         }
//         else {
//             return true;
//         }
//     };
//
//     /**
//      * Fetches the events object and creates one if required.
//      *
//      * @return {Object} The events storage object.
//      * @api private
//      */
//     proto._getEvents = function _getEvents() {
//         return this._events || (this._events = {});
//     };
//
//     /**
//      * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
//      *
//      * @return {Function} Non conflicting EventEmitter class.
//      */
//     EventEmitter.noConflict = function noConflict() {
//         exports.EventEmitter = originalGlobalValue;
//         return EventEmitter;
//     };
//
//     // Expose the class either via AMD, CommonJS or the global object
//     if (typeof define === 'function' && define.amd) {
//         define('eventEmitter/EventEmitter',[],function () {
//             return EventEmitter;
//         });
//     }
//     else if (typeof module === 'object' && module.exports){
//         module.exports = EventEmitter;
//     }
//     else {
//         this.EventEmitter = EventEmitter;
//     }
// }.call(this));
//
// /*!
//  * eventie v1.0.4
//  * event binding helper
//  *   eventie.bind( elem, 'click', myFn )
//  *   eventie.unbind( elem, 'click', myFn )
//  */
//
// /*jshint browser: true, undef: true, unused: true */
// /*global define: false */
//
// ( function( window ) {
//
//
//
//     var docElem = document.documentElement;
//
//     var bind = function() {};
//
//     function getIEEvent( obj ) {
//         var event = window.event;
//         // add event.target
//         event.target = event.target || event.srcElement || obj;
//         return event;
//     }
//
//     if ( docElem.addEventListener ) {
//         bind = function( obj, type, fn ) {
//             obj.addEventListener( type, fn, false );
//         };
//     } else if ( docElem.attachEvent ) {
//         bind = function( obj, type, fn ) {
//             obj[ type + fn ] = fn.handleEvent ?
//                 function() {
//                     var event = getIEEvent( obj );
//                     fn.handleEvent.call( fn, event );
//                 } :
//                 function() {
//                     var event = getIEEvent( obj );
//                     fn.call( obj, event );
//                 };
//             obj.attachEvent( "on" + type, obj[ type + fn ] );
//         };
//     }
//
//     var unbind = function() {};
//
//     if ( docElem.removeEventListener ) {
//         unbind = function( obj, type, fn ) {
//             obj.removeEventListener( type, fn, false );
//         };
//     } else if ( docElem.detachEvent ) {
//         unbind = function( obj, type, fn ) {
//             obj.detachEvent( "on" + type, obj[ type + fn ] );
//             try {
//                 delete obj[ type + fn ];
//             } catch ( err ) {
//                 // can't delete window object properties
//                 obj[ type + fn ] = undefined;
//             }
//         };
//     }
//
//     var eventie = {
//         bind: bind,
//         unbind: unbind
//     };
//
// // transport
//     if ( typeof define === 'function' && define.amd ) {
//         // AMD
//         define( 'eventie/eventie',eventie );
//     } else {
//         // browser global
//         window.eventie = eventie;
//     }
//
// })( this );
//
// /*!
//  * imagesLoaded v3.1.8
//  * JavaScript is all like "You images are done yet or what?"
//  * MIT License
//  */
//
// ( function( window, factory ) {
//     // universal module definition
//
//     /*global define: false, module: false, require: false */
//
//     if ( typeof define === 'function' && define.amd ) {
//         // AMD
//         define( [
//             'eventEmitter/EventEmitter',
//             'eventie/eventie'
//         ], function( EventEmitter, eventie ) {
//             return factory( window, EventEmitter, eventie );
//         });
//     } else if ( typeof exports === 'object' ) {
//         // CommonJS
//         module.exports = factory(
//             window,
//             require('wolfy87-eventemitter'),
//             require('eventie')
//         );
//     } else {
//         // browser global
//         window.imagesLoaded = factory(
//             window,
//             window.EventEmitter,
//             window.eventie
//         );
//     }
//
// })( window,
//
// // --------------------------  factory -------------------------- //
//
//     function factory( window, EventEmitter, eventie ) {
//
//
//
// // var $ = window.jQuery;
//         var $ = $J;
//         var console = window.console;
//         var hasConsole = typeof console !== 'undefined';
//
// // -------------------------- helpers -------------------------- //
//
// // extend objects
//         function extend( a, b ) {
//             for ( var prop in b ) {
//                 a[ prop ] = b[ prop ];
//             }
//             return a;
//         }
//
//         var objToString = Object.prototype.toString;
//         function isArray( obj ) {
//             return objToString.call( obj ) === '[object Array]';
//         }
//
// // turn element or nodeList into an array
//         function makeArray( obj ) {
//             var ary = [];
//             if ( isArray( obj ) ) {
//                 // use object if already an array
//                 ary = obj;
//             } else if ( typeof obj.length === 'number' ) {
//                 // convert nodeList to array
//                 for ( var i=0, len = obj.length; i < len; i++ ) {
//                     ary.push( obj[i] );
//                 }
//             } else {
//                 // array of single index
//                 ary.push( obj );
//             }
//             return ary;
//         }
//
//         // -------------------------- imagesLoaded -------------------------- //
//
//         /**
//          * @param {Array, Element, NodeList, String} elem
//          * @param {Object or Function} options - if function, use as callback
//          * @param {Function} onAlways - callback function
//          */
//         function ImagesLoaded( elem, options, onAlways ) {
//             // coerce ImagesLoaded() without new, to be new ImagesLoaded()
//             if ( !( this instanceof ImagesLoaded ) ) {
//                 return new ImagesLoaded( elem, options );
//             }
//             // use elem as selector string
//             if ( typeof elem === 'string' ) {
//                 elem = document.querySelectorAll( elem );
//             }
//
//             this.elements = makeArray( elem );
//             this.options = extend( {}, this.options );
//
//             if ( typeof options === 'function' ) {
//                 onAlways = options;
//             } else {
//                 extend( this.options, options );
//             }
//
//             if ( onAlways ) {
//                 this.on( 'always', onAlways );
//             }
//
//             this.getImages();
//
//             if ( $ ) {
//                 // add jQuery Deferred object
//                 this.jqDeferred = new $.Deferred();
//             }
//
//             // HACK check async to allow time to bind listeners
//             var _this = this;
//             setTimeout( function() {
//                 _this.check();
//             });
//         }
//
//         ImagesLoaded.prototype = new EventEmitter();
//
//         ImagesLoaded.prototype.options = {};
//
//         ImagesLoaded.prototype.getImages = function() {
//             this.images = [];
//
//             // filter & find items if we have an item selector
//             for ( var i=0, len = this.elements.length; i < len; i++ ) {
//                 var elem = this.elements[i];
//                 // filter siblings
//                 if ( elem.nodeName === 'IMG' ) {
//                     this.addImage( elem );
//                 }
//                 // find children
//                 // no non-element nodes, #143
//                 var nodeType = elem.nodeType;
//                 if ( !nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ) {
//                     continue;
//                 }
//                 var childElems = elem.querySelectorAll('img');
//                 // concat childElems to filterFound array
//                 for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
//                     var img = childElems[j];
//                     this.addImage( img );
//                 }
//             }
//         };
//
//         /**
//          * @param {Image} img
//          */
//         ImagesLoaded.prototype.addImage = function( img ) {
//             var loadingImage = new LoadingImage( img );
//             this.images.push( loadingImage );
//         };
//
//         ImagesLoaded.prototype.check = function() {
//             var _this = this;
//             var checkedCount = 0;
//             var length = this.images.length;
//             this.hasAnyBroken = false;
//             // complete if no images
//             if ( !length ) {
//                 this.complete();
//                 return;
//             }
//
//             function onConfirm( image, message ) {
//                 if ( _this.options.debug && hasConsole ) {
//                     console.log( 'confirm', image, message );
//                 }
//
//                 _this.progress( image );
//                 checkedCount++;
//                 if ( checkedCount === length ) {
//                     _this.complete();
//                 }
//                 return true; // bind once
//             }
//
//             for ( var i=0; i < length; i++ ) {
//                 var loadingImage = this.images[i];
//                 loadingImage.on( 'confirm', onConfirm );
//                 loadingImage.check();
//             }
//         };
//
//         ImagesLoaded.prototype.progress = function( image ) {
//             this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
//             // HACK - Chrome triggers event before object properties have changed. #83
//             var _this = this;
//             setTimeout( function() {
//                 _this.emit( 'progress', _this, image );
//                 if ( _this.jqDeferred && _this.jqDeferred.notify ) {
//                     _this.jqDeferred.notify( _this, image );
//                 }
//             });
//         };
//
//         ImagesLoaded.prototype.complete = function() {
//             var eventName = this.hasAnyBroken ? 'fail' : 'done';
//             this.isComplete = true;
//             var _this = this;
//             // HACK - another setTimeout so that confirm happens after progress
//             setTimeout( function() {
//                 _this.emit( eventName, _this );
//                 _this.emit( 'always', _this );
//                 if ( _this.jqDeferred ) {
//                     var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
//                     _this.jqDeferred[ jqMethod ]( _this );
//                 }
//             });
//         };
//
//         // -------------------------- jquery -------------------------- //
//
//         if ( $ ) {
//             $.fn.imagesLoaded = function( options, callback ) {
//                 var instance = new ImagesLoaded( this, options, callback );
//                 return instance.jqDeferred.promise( $(this) );
//             };
//         }
//
//
//         // --------------------------  -------------------------- //
//
//         function LoadingImage( img ) {
//             this.img = img;
//         }
//
//         LoadingImage.prototype = new EventEmitter();
//
//         LoadingImage.prototype.check = function() {
//             // first check cached any previous images that have same src
//             var resource = cache[ this.img.src ] || new Resource( this.img.src );
//             if ( resource.isConfirmed ) {
//                 this.confirm( resource.isLoaded, 'cached was confirmed' );
//                 return;
//             }
//
//             // If complete is true and browser supports natural sizes,
//             // try to check for image status manually.
//             if ( this.img.complete && this.img.naturalWidth !== undefined ) {
//                 // report based on naturalWidth
//                 this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
//                 return;
//             }
//
//             // If none of the checks above matched, simulate loading on detached element.
//             var _this = this;
//             resource.on( 'confirm', function( resrc, message ) {
//                 _this.confirm( resrc.isLoaded, message );
//                 return true;
//             });
//
//             resource.check();
//         };
//
//         LoadingImage.prototype.confirm = function( isLoaded, message ) {
//             this.isLoaded = isLoaded;
//             this.emit( 'confirm', this, message );
//         };
//
//         // -------------------------- Resource -------------------------- //
//
//         // Resource checks each src, only once
//         // separate class from LoadingImage to prevent memory leaks. See #115
//
//         var cache = {};
//
//         function Resource( src ) {
//             this.src = src;
//             // add to cache
//             cache[ src ] = this;
//         }
//
//         Resource.prototype = new EventEmitter();
//
//         Resource.prototype.check = function() {
//             // only trigger checking once
//             if ( this.isChecked ) {
//                 return;
//             }
//             // simulate loading on detached element
//             var proxyImage = new Image();
//             eventie.bind( proxyImage, 'load', this );
//             eventie.bind( proxyImage, 'error', this );
//             proxyImage.src = this.src;
//             // set flag
//             this.isChecked = true;
//         };
//
//         // ----- events ----- //
//
//         // trigger specified handler for event type
//         Resource.prototype.handleEvent = function( event ) {
//             var method = 'on' + event.type;
//             if ( this[ method ] ) {
//                 this[ method ]( event );
//             }
//         };
//
//         Resource.prototype.onload = function( event ) {
//             this.confirm( true, 'onload' );
//             this.unbindProxyEvents( event );
//         };
//
//         Resource.prototype.onerror = function( event ) {
//             this.confirm( false, 'onerror' );
//             this.unbindProxyEvents( event );
//         };
//
//         // ----- confirm ----- //
//
//         Resource.prototype.confirm = function( isLoaded, message ) {
//             this.isConfirmed = true;
//             this.isLoaded = isLoaded;
//             this.emit( 'confirm', this, message );
//         };
//
//         Resource.prototype.unbindProxyEvents = function( event ) {
//             eventie.unbind( event.target, 'load', this );
//             eventie.unbind( event.target, 'error', this );
//         };
//
//         // -----  ----- //
//
//         return ImagesLoaded;
//
//     });
// /*!
//  * Masonry PACKAGED v3.3.2
//  * Cascading grid layout library
//  * http://masonry.desandro.com
//  * MIT License
//  * by David DeSandro
//  */
//
// /**
//  * Bridget makes jQuery widgets
//  * v1.1.0
//  * MIT license
//  */
//
// ( function( window ) {
//
//
//
// // -------------------------- utils -------------------------- //
//
//     var slice = Array.prototype.slice;
//
//     function noop() {}
//
// // -------------------------- definition -------------------------- //
//
//     function defineBridget( $ ) {
//
// // bail if no jQuery
//         if ( !$ ) {
//             return;
//         }
//
// // -------------------------- addOptionMethod -------------------------- //
//
//         /**
//          * adds option method -> $().plugin('option', {...})
//          * @param {Function} PluginClass - constructor class
//          */
//         function addOptionMethod( PluginClass ) {
//             // don't overwrite original option method
//             if ( PluginClass.prototype.option ) {
//                 return;
//             }
//
//             // option setter
//             PluginClass.prototype.option = function( opts ) {
//                 // bail out if not an object
//                 if ( !$.isPlainObject( opts ) ){
//                     return;
//                 }
//                 this.options = $.extend( true, this.options, opts );
//             };
//         }
//
// // -------------------------- plugin bridge -------------------------- //
//
// // helper function for logging errors
// // $.error breaks jQuery chaining
//         var logError = typeof console === 'undefined' ? noop :
//             function( message ) {
//                 console.error( message );
//             };
//
//         /**
//          * jQuery plugin bridge, access methods like $elem.plugin('method')
//          * @param {String} namespace - plugin name
//          * @param {Function} PluginClass - constructor class
//          */
//         function bridge( namespace, PluginClass ) {
//             // add to jQuery fn namespace
//             $.fn[ namespace ] = function( options ) {
//                 if ( typeof options === 'string' ) {
//                     // call plugin method when first argument is a string
//                     // get arguments for method
//                     var args = slice.call( arguments, 1 );
//
//                     for ( var i=0, len = this.length; i < len; i++ ) {
//                         var elem = this[i];
//                         var instance = $.data( elem, namespace );
//                         if ( !instance ) {
//                             logError( "cannot call methods on " + namespace + " prior to initialization; " +
//                                 "attempted to call '" + options + "'" );
//                             continue;
//                         }
//                         if ( !$.isFunction( instance[options] ) || options.charAt(0) === '_' ) {
//                             logError( "no such method '" + options + "' for " + namespace + " instance" );
//                             continue;
//                         }
//
//                         // trigger method with arguments
//                         var returnValue = instance[ options ].apply( instance, args );
//
//                         // break look and return first value if provided
//                         if ( returnValue !== undefined ) {
//                             return returnValue;
//                         }
//                     }
//                     // return this if no return value
//                     return this;
//                 } else {
//                     return this.each( function() {
//                         var instance = $.data( this, namespace );
//                         if ( instance ) {
//                             // apply options & init
//                             instance.option( options );
//                             instance._init();
//                         } else {
//                             // initialize new instance
//                             instance = new PluginClass( this, options );
//                             $.data( this, namespace, instance );
//                         }
//                     });
//                 }
//             };
//
//         }
//
// // -------------------------- bridget -------------------------- //
//
//         /**
//          * converts a Prototypical class into a proper jQuery plugin
//          *   the class must have a ._init method
//          * @param {String} namespace - plugin name, used in $().pluginName
//          * @param {Function} PluginClass - constructor class
//          */
//         $.bridget = function( namespace, PluginClass ) {
//             addOptionMethod( PluginClass );
//             bridge( namespace, PluginClass );
//         };
//
//         return $.bridget;
//
//     }
//
// // transport
//     if ( typeof define === 'function' && define.amd ) {
//         // AMD
//         define( 'jquery-bridget/jquery.bridget',[ 'jquery' ], defineBridget );
//     } else if ( typeof exports === 'object' ) {
//         defineBridget( require('jquery') );
//     } else {
//         // get jquery from browser global
//         defineBridget( window.$J );
//     }
//
// })( window );
//
// /*!
//  * eventie v1.0.6
//  * event binding helper
//  *   eventie.bind( elem, 'click', myFn )
//  *   eventie.unbind( elem, 'click', myFn )
//  * MIT license
//  */
//
// /*jshint browser: true, undef: true, unused: true */
// /*global define: false, module: false */
//
// ( function( window ) {
//
//
//
//     var docElem = document.documentElement;
//
//     var bind = function() {};
//
//     function getIEEvent( obj ) {
//         var event = window.event;
//         // add event.target
//         event.target = event.target || event.srcElement || obj;
//         return event;
//     }
//
//     if ( docElem.addEventListener ) {
//         bind = function( obj, type, fn ) {
//             obj.addEventListener( type, fn, false );
//         };
//     } else if ( docElem.attachEvent ) {
//         bind = function( obj, type, fn ) {
//             obj[ type + fn ] = fn.handleEvent ?
//                 function() {
//                     var event = getIEEvent( obj );
//                     fn.handleEvent.call( fn, event );
//                 } :
//                 function() {
//                     var event = getIEEvent( obj );
//                     fn.call( obj, event );
//                 };
//             obj.attachEvent( "on" + type, obj[ type + fn ] );
//         };
//     }
//
//     var unbind = function() {};
//
//     if ( docElem.removeEventListener ) {
//         unbind = function( obj, type, fn ) {
//             obj.removeEventListener( type, fn, false );
//         };
//     } else if ( docElem.detachEvent ) {
//         unbind = function( obj, type, fn ) {
//             obj.detachEvent( "on" + type, obj[ type + fn ] );
//             try {
//                 delete obj[ type + fn ];
//             } catch ( err ) {
//                 // can't delete window object properties
//                 obj[ type + fn ] = undefined;
//             }
//         };
//     }
//
//     var eventie = {
//         bind: bind,
//         unbind: unbind
//     };
//
// // ----- module definition ----- //
//
//     if ( typeof define === 'function' && define.amd ) {
//         // AMD
//         define( 'eventie/eventie',eventie );
//     } else if ( typeof exports === 'object' ) {
//         // CommonJS
//         module.exports = eventie;
//     } else {
//         // browser global
//         window.eventie = eventie;
//     }
//
// })( window );
//
// /*!
//  * EventEmitter v4.2.11 - git.io/ee
//  * Unlicense - http://unlicense.org/
//  * Oliver Caldwell - http://oli.me.uk/
//  * @preserve
//  */
//
// ;(function () {
//
//
//     /**
//      * Class for managing events.
//      * Can be extended to provide event functionality in other classes.
//      *
//      * @class EventEmitter Manages event registering and emitting.
//      */
//     function EventEmitter() {}
//
//     // Shortcuts to improve speed and size
//     var proto = EventEmitter.prototype;
//     var exports = this;
//     var originalGlobalValue = exports.EventEmitter;
//
//     /**
//      * Finds the index of the listener for the event in its storage array.
//      *
//      * @param {Function[]} listeners Array of listeners to search through.
//      * @param {Function} listener Method to look for.
//      * @return {Number} Index of the specified listener, -1 if not found
//      * @api private
//      */
//     function indexOfListener(listeners, listener) {
//         var i = listeners.length;
//         while (i--) {
//             if (listeners[i].listener === listener) {
//                 return i;
//             }
//         }
//
//         return -1;
//     }
//
//     /**
//      * Alias a method while keeping the context correct, to allow for overwriting of target method.
//      *
//      * @param {String} name The name of the target method.
//      * @return {Function} The aliased method
//      * @api private
//      */
//     function alias(name) {
//         return function aliasClosure() {
//             return this[name].apply(this, arguments);
//         };
//     }
//
//     /**
//      * Returns the listener array for the specified event.
//      * Will initialise the event object and listener arrays if required.
//      * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
//      * Each property in the object response is an array of listener functions.
//      *
//      * @param {String|RegExp} evt Name of the event to return the listeners from.
//      * @return {Function[]|Object} All listener functions for the event.
//      */
//     proto.getListeners = function getListeners(evt) {
//         var events = this._getEvents();
//         var response;
//         var key;
//
//         // Return a concatenated array of all matching events if
//         // the selector is a regular expression.
//         if (evt instanceof RegExp) {
//             response = {};
//             for (key in events) {
//                 if (events.hasOwnProperty(key) && evt.test(key)) {
//                     response[key] = events[key];
//                 }
//             }
//         }
//         else {
//             response = events[evt] || (events[evt] = []);
//         }
//
//         return response;
//     };
//
//     /**
//      * Takes a list of listener objects and flattens it into a list of listener functions.
//      *
//      * @param {Object[]} listeners Raw listener objects.
//      * @return {Function[]} Just the listener functions.
//      */
//     proto.flattenListeners = function flattenListeners(listeners) {
//         var flatListeners = [];
//         var i;
//
//         for (i = 0; i < listeners.length; i += 1) {
//             flatListeners.push(listeners[i].listener);
//         }
//
//         return flatListeners;
//     };
//
//     /**
//      * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
//      *
//      * @param {String|RegExp} evt Name of the event to return the listeners from.
//      * @return {Object} All listener functions for an event in an object.
//      */
//     proto.getListenersAsObject = function getListenersAsObject(evt) {
//         var listeners = this.getListeners(evt);
//         var response;
//
//         if (listeners instanceof Array) {
//             response = {};
//             response[evt] = listeners;
//         }
//
//         return response || listeners;
//     };
//
//     /**
//      * Adds a listener function to the specified event.
//      * The listener will not be added if it is a duplicate.
//      * If the listener returns true then it will be removed after it is called.
//      * If you pass a regular expression as the event name then the listener will be added to all events that match it.
//      *
//      * @param {String|RegExp} evt Name of the event to attach the listener to.
//      * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.addListener = function addListener(evt, listener) {
//         var listeners = this.getListenersAsObject(evt);
//         var listenerIsWrapped = typeof listener === 'object';
//         var key;
//
//         for (key in listeners) {
//             if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
//                 listeners[key].push(listenerIsWrapped ? listener : {
//                     listener: listener,
//                     once: false
//                 });
//             }
//         }
//
//         return this;
//     };
//
//     /**
//      * Alias of addListener
//      */
//     proto.on = alias('addListener');
//
//     /**
//      * Semi-alias of addListener. It will add a listener that will be
//      * automatically removed after its first execution.
//      *
//      * @param {String|RegExp} evt Name of the event to attach the listener to.
//      * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.addOnceListener = function addOnceListener(evt, listener) {
//         return this.addListener(evt, {
//             listener: listener,
//             once: true
//         });
//     };
//
//     /**
//      * Alias of addOnceListener.
//      */
//     proto.once = alias('addOnceListener');
//
//     /**
//      * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
//      * You need to tell it what event names should be matched by a regex.
//      *
//      * @param {String} evt Name of the event to create.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.defineEvent = function defineEvent(evt) {
//         this.getListeners(evt);
//         return this;
//     };
//
//     /**
//      * Uses defineEvent to define multiple events.
//      *
//      * @param {String[]} evts An array of event names to define.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.defineEvents = function defineEvents(evts) {
//         for (var i = 0; i < evts.length; i += 1) {
//             this.defineEvent(evts[i]);
//         }
//         return this;
//     };
//
//     /**
//      * Removes a listener function from the specified event.
//      * When passed a regular expression as the event name, it will remove the listener from all events that match it.
//      *
//      * @param {String|RegExp} evt Name of the event to remove the listener from.
//      * @param {Function} listener Method to remove from the event.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.removeListener = function removeListener(evt, listener) {
//         var listeners = this.getListenersAsObject(evt);
//         var index;
//         var key;
//
//         for (key in listeners) {
//             if (listeners.hasOwnProperty(key)) {
//                 index = indexOfListener(listeners[key], listener);
//
//                 if (index !== -1) {
//                     listeners[key].splice(index, 1);
//                 }
//             }
//         }
//
//         return this;
//     };
//
//     /**
//      * Alias of removeListener
//      */
//     proto.off = alias('removeListener');
//
//     /**
//      * Adds listeners in bulk using the manipulateListeners method.
//      * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
//      * You can also pass it a regular expression to add the array of listeners to all events that match it.
//      * Yeah, this function does quite a bit. That's probably a bad thing.
//      *
//      * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
//      * @param {Function[]} [listeners] An optional array of listener functions to add.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.addListeners = function addListeners(evt, listeners) {
//         // Pass through to manipulateListeners
//         return this.manipulateListeners(false, evt, listeners);
//     };
//
//     /**
//      * Removes listeners in bulk using the manipulateListeners method.
//      * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
//      * You can also pass it an event name and an array of listeners to be removed.
//      * You can also pass it a regular expression to remove the listeners from all events that match it.
//      *
//      * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
//      * @param {Function[]} [listeners] An optional array of listener functions to remove.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.removeListeners = function removeListeners(evt, listeners) {
//         // Pass through to manipulateListeners
//         return this.manipulateListeners(true, evt, listeners);
//     };
//
//     /**
//      * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
//      * The first argument will determine if the listeners are removed (true) or added (false).
//      * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
//      * You can also pass it an event name and an array of listeners to be added/removed.
//      * You can also pass it a regular expression to manipulate the listeners of all events that match it.
//      *
//      * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
//      * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
//      * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
//         var i;
//         var value;
//         var single = remove ? this.removeListener : this.addListener;
//         var multiple = remove ? this.removeListeners : this.addListeners;
//
//         // If evt is an object then pass each of its properties to this method
//         if (typeof evt === 'object' && !(evt instanceof RegExp)) {
//             for (i in evt) {
//                 if (evt.hasOwnProperty(i) && (value = evt[i])) {
//                     // Pass the single listener straight through to the singular method
//                     if (typeof value === 'function') {
//                         single.call(this, i, value);
//                     }
//                     else {
//                         // Otherwise pass back to the multiple function
//                         multiple.call(this, i, value);
//                     }
//                 }
//             }
//         }
//         else {
//             // So evt must be a string
//             // And listeners must be an array of listeners
//             // Loop over it and pass each one to the multiple method
//             i = listeners.length;
//             while (i--) {
//                 single.call(this, evt, listeners[i]);
//             }
//         }
//
//         return this;
//     };
//
//     /**
//      * Removes all listeners from a specified event.
//      * If you do not specify an event then all listeners will be removed.
//      * That means every event will be emptied.
//      * You can also pass a regex to remove all events that match it.
//      *
//      * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.removeEvent = function removeEvent(evt) {
//         var type = typeof evt;
//         var events = this._getEvents();
//         var key;
//
//         // Remove different things depending on the state of evt
//         if (type === 'string') {
//             // Remove all listeners for the specified event
//             delete events[evt];
//         }
//         else if (evt instanceof RegExp) {
//             // Remove all events matching the regex.
//             for (key in events) {
//                 if (events.hasOwnProperty(key) && evt.test(key)) {
//                     delete events[key];
//                 }
//             }
//         }
//         else {
//             // Remove all listeners in all events
//             delete this._events;
//         }
//
//         return this;
//     };
//
//     /**
//      * Alias of removeEvent.
//      *
//      * Added to mirror the node API.
//      */
//     proto.removeAllListeners = alias('removeEvent');
//
//     /**
//      * Emits an event of your choice.
//      * When emitted, every listener attached to that event will be executed.
//      * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
//      * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
//      * So they will not arrive within the array on the other side, they will be separate.
//      * You can also pass a regular expression to emit to all events that match it.
//      *
//      * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
//      * @param {Array} [args] Optional array of arguments to be passed to each listener.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.emitEvent = function emitEvent(evt, args) {
//         var listeners = this.getListenersAsObject(evt);
//         var listener;
//         var i;
//         var key;
//         var response;
//
//         for (key in listeners) {
//             if (listeners.hasOwnProperty(key)) {
//                 i = listeners[key].length;
//
//                 while (i--) {
//                     // If the listener returns true then it shall be removed from the event
//                     // The function is executed either with a basic call or an apply if there is an args array
//                     listener = listeners[key][i];
//
//                     if (listener.once === true) {
//                         this.removeListener(evt, listener.listener);
//                     }
//
//                     response = listener.listener.apply(this, args || []);
//
//                     if (response === this._getOnceReturnValue()) {
//                         this.removeListener(evt, listener.listener);
//                     }
//                 }
//             }
//         }
//
//         return this;
//     };
//
//     /**
//      * Alias of emitEvent
//      */
//     proto.trigger = alias('emitEvent');
//
//     /**
//      * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
//      * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
//      *
//      * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
//      * @param {...*} Optional additional arguments to be passed to each listener.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.emit = function emit(evt) {
//         var args = Array.prototype.slice.call(arguments, 1);
//         return this.emitEvent(evt, args);
//     };
//
//     /**
//      * Sets the current value to check against when executing listeners. If a
//      * listeners return value matches the one set here then it will be removed
//      * after execution. This value defaults to true.
//      *
//      * @param {*} value The new value to check for when executing listeners.
//      * @return {Object} Current instance of EventEmitter for chaining.
//      */
//     proto.setOnceReturnValue = function setOnceReturnValue(value) {
//         this._onceReturnValue = value;
//         return this;
//     };
//
//     /**
//      * Fetches the current value to check against when executing listeners. If
//      * the listeners return value matches this one then it should be removed
//      * automatically. It will return true by default.
//      *
//      * @return {*|Boolean} The current value to check for or the default, true.
//      * @api private
//      */
//     proto._getOnceReturnValue = function _getOnceReturnValue() {
//         if (this.hasOwnProperty('_onceReturnValue')) {
//             return this._onceReturnValue;
//         }
//         else {
//             return true;
//         }
//     };
//
//     /**
//      * Fetches the events object and creates one if required.
//      *
//      * @return {Object} The events storage object.
//      * @api private
//      */
//     proto._getEvents = function _getEvents() {
//         return this._events || (this._events = {});
//     };
//
//     /**
//      * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
//      *
//      * @return {Function} Non conflicting EventEmitter class.
//      */
//     EventEmitter.noConflict = function noConflict() {
//         exports.EventEmitter = originalGlobalValue;
//         return EventEmitter;
//     };
//
//     // Expose the class either via AMD, CommonJS or the global object
//     if (typeof define === 'function' && define.amd) {
//         define('eventEmitter/EventEmitter',[],function () {
//             return EventEmitter;
//         });
//     }
//     else if (typeof module === 'object' && module.exports){
//         module.exports = EventEmitter;
//     }
//     else {
//         exports.EventEmitter = EventEmitter;
//     }
// }.call(this));
//
// /*!
//  * getStyleProperty v1.0.4
//  * original by kangax
//  * http://perfectionkills.com/feature-testing-css-properties/
//  * MIT license
//  */
//
// /*jshint browser: true, strict: true, undef: true */
// /*global define: false, exports: false, module: false */
//
// ( function( window ) {
//
//
//
//     var prefixes = 'Webkit Moz ms Ms O'.split(' ');
//     var docElemStyle = document.documentElement.style;
//
//     function getStyleProperty( propName ) {
//         if ( !propName ) {
//             return;
//         }
//
//         // test standard property first
//         if ( typeof docElemStyle[ propName ] === 'string' ) {
//             return propName;
//         }
//
//         // capitalize
//         propName = propName.charAt(0).toUpperCase() + propName.slice(1);
//
//         // test vendor specific properties
//         var prefixed;
//         for ( var i=0, len = prefixes.length; i < len; i++ ) {
//             prefixed = prefixes[i] + propName;
//             if ( typeof docElemStyle[ prefixed ] === 'string' ) {
//                 return prefixed;
//             }
//         }
//     }
//
// // transport
//     if ( typeof define === 'function' && define.amd ) {
//         // AMD
//         define( 'get-style-property/get-style-property',[],function() {
//             return getStyleProperty;
//         });
//     } else if ( typeof exports === 'object' ) {
//         // CommonJS for Component
//         module.exports = getStyleProperty;
//     } else {
//         // browser global
//         window.getStyleProperty = getStyleProperty;
//     }
//
// })( window );
//
// /*!
//  * getSize v1.2.2
//  * measure size of elements
//  * MIT license
//  */
//
// /*jshint browser: true, strict: true, undef: true, unused: true */
// /*global define: false, exports: false, require: false, module: false, console: false */
//
// ( function( window, undefined ) {
//
//
//
// // -------------------------- helpers -------------------------- //
//
// // get a number from a string, not a percentage
//     function getStyleSize( value ) {
//         var num = parseFloat( value );
//         // not a percent like '100%', and a number
//         var isValid = value.indexOf('%') === -1 && !isNaN( num );
//         return isValid && num;
//     }
//
//     function noop() {}
//
//     var logError = typeof console === 'undefined' ? noop :
//         function( message ) {
//             console.error( message );
//         };
//
// // -------------------------- measurements -------------------------- //
//
//     var measurements = [
//         'paddingLeft',
//         'paddingRight',
//         'paddingTop',
//         'paddingBottom',
//         'marginLeft',
//         'marginRight',
//         'marginTop',
//         'marginBottom',
//         'borderLeftWidth',
//         'borderRightWidth',
//         'borderTopWidth',
//         'borderBottomWidth'
//     ];
//
//     function getZeroSize() {
//         var size = {
//             width: 0,
//             height: 0,
//             innerWidth: 0,
//             innerHeight: 0,
//             outerWidth: 0,
//             outerHeight: 0
//         };
//         for ( var i=0, len = measurements.length; i < len; i++ ) {
//             var measurement = measurements[i];
//             size[ measurement ] = 0;
//         }
//         return size;
//     }
//
//
//
//     function defineGetSize( getStyleProperty ) {
//
// // -------------------------- setup -------------------------- //
//
//         var isSetup = false;
//
//         var getStyle, boxSizingProp, isBoxSizeOuter;
//
//         /**
//          * setup vars and functions
//          * do it on initial getSize(), rather than on script load
//          * For Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=548397
//          */
//         function setup() {
//             // setup once
//             if ( isSetup ) {
//                 return;
//             }
//             isSetup = true;
//
//             var getComputedStyle = window.getComputedStyle;
//             getStyle = ( function() {
//                 var getStyleFn = getComputedStyle ?
//                     function( elem ) {
//                         return getComputedStyle( elem, null );
//                     } :
//                     function( elem ) {
//                         return elem.currentStyle;
//                     };
//
//                 return function getStyle( elem ) {
//                     var style = getStyleFn( elem );
//                     if ( !style ) {
//                         logError( 'Style returned ' + style +
//                             '. Are you running this code in a hidden iframe on Firefox? ' +
//                             'See http://bit.ly/getsizebug1' );
//                     }
//                     return style;
//                 };
//             })();
//
//             // -------------------------- box sizing -------------------------- //
//
//             boxSizingProp = getStyleProperty('boxSizing');
//
//             /**
//              * WebKit measures the outer-width on style.width on border-box elems
//              * IE & Firefox measures the inner-width
//              */
//             if ( boxSizingProp ) {
//                 var div = document.createElement('div');
//                 div.style.width = '200px';
//                 div.style.padding = '1px 2px 3px 4px';
//                 div.style.borderStyle = 'solid';
//                 div.style.borderWidth = '1px 2px 3px 4px';
//                 div.style[ boxSizingProp ] = 'border-box';
//
//                 var body = document.body || document.documentElement;
//                 body.appendChild( div );
//                 var style = getStyle( div );
//
//                 isBoxSizeOuter = getStyleSize( style.width ) === 200;
//                 body.removeChild( div );
//             }
//
//         }
//
// // -------------------------- getSize -------------------------- //
//
//         function getSize( elem ) {
//             setup();
//
//             // use querySeletor if elem is string
//             if ( typeof elem === 'string' ) {
//                 elem = document.querySelector( elem );
//             }
//
//             // do not proceed on non-objects
//             if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {
//                 return;
//             }
//
//             var style = getStyle( elem );
//
//             // if hidden, everything is 0
//             if ( style.display === 'none' ) {
//                 return getZeroSize();
//             }
//
//             var size = {};
//             size.width = elem.offsetWidth;
//             size.height = elem.offsetHeight;
//
//             var isBorderBox = size.isBorderBox = !!( boxSizingProp &&
//                 style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );
//
//             // get all measurements
//             for ( var i=0, len = measurements.length; i < len; i++ ) {
//                 var measurement = measurements[i];
//                 var value = style[ measurement ];
//                 value = mungeNonPixel( elem, value );
//                 var num = parseFloat( value );
//                 // any 'auto', 'medium' value will be 0
//                 size[ measurement ] = !isNaN( num ) ? num : 0;
//             }
//
//             var paddingWidth = size.paddingLeft + size.paddingRight;
//             var paddingHeight = size.paddingTop + size.paddingBottom;
//             var marginWidth = size.marginLeft + size.marginRight;
//             var marginHeight = size.marginTop + size.marginBottom;
//             var borderWidth = size.borderLeftWidth + size.borderRightWidth;
//             var borderHeight = size.borderTopWidth + size.borderBottomWidth;
//
//             var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
//
//             // overwrite width and height if we can get it from style
//             var styleWidth = getStyleSize( style.width );
//             if ( styleWidth !== false ) {
//                 size.width = styleWidth +
//                     // add padding and border unless it's already including it
//                     ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
//             }
//
//             var styleHeight = getStyleSize( style.height );
//             if ( styleHeight !== false ) {
//                 size.height = styleHeight +
//                     // add padding and border unless it's already including it
//                     ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
//             }
//
//             size.innerWidth = size.width - ( paddingWidth + borderWidth );
//             size.innerHeight = size.height - ( paddingHeight + borderHeight );
//
//             size.outerWidth = size.width + marginWidth;
//             size.outerHeight = size.height + marginHeight;
//
//             return size;
//         }
//
// // IE8 returns percent values, not pixels
// // taken from jQuery's curCSS
//         function mungeNonPixel( elem, value ) {
//             // IE8 and has percent value
//             if ( window.getComputedStyle || value.indexOf('%') === -1 ) {
//                 return value;
//             }
//             var style = elem.style;
//             // Remember the original values
//             var left = style.left;
//             var rs = elem.runtimeStyle;
//             var rsLeft = rs && rs.left;
//
//             // Put in the new values to get a computed value out
//             if ( rsLeft ) {
//                 rs.left = elem.currentStyle.left;
//             }
//             style.left = value;
//             value = style.pixelLeft;
//
//             // Revert the changed values
//             style.left = left;
//             if ( rsLeft ) {
//                 rs.left = rsLeft;
//             }
//
//             return value;
//         }
//
//         return getSize;
//
//     }
//
// // transport
//     if ( typeof define === 'function' && define.amd ) {
//         // AMD for RequireJS
//         define( 'get-size/get-size',[ 'get-style-property/get-style-property' ], defineGetSize );
//     } else if ( typeof exports === 'object' ) {
//         // CommonJS for Component
//         module.exports = defineGetSize( require('desandro-get-style-property') );
//     } else {
//         // browser global
//         window.getSize = defineGetSize( window.getStyleProperty );
//     }
//
// })( window );
//
// /*!
//  * docReady v1.0.4
//  * Cross browser DOMContentLoaded event emitter
//  * MIT license
//  */
//
// /*jshint browser: true, strict: true, undef: true, unused: true*/
// /*global define: false, require: false, module: false */
//
// ( function( window ) {
//
//
//
//     var document = window.document;
// // collection of functions to be triggered on ready
//     var queue = [];
//
//     function docReady( fn ) {
//         // throw out non-functions
//         if ( typeof fn !== 'function' ) {
//             return;
//         }
//
//         if ( docReady.isReady ) {
//             // ready now, hit it
//             fn();
//         } else {
//             // queue function when ready
//             queue.push( fn );
//         }
//     }
//
//     docReady.isReady = false;
//
// // triggered on various doc ready events
//     function onReady( event ) {
//         // bail if already triggered or IE8 document is not ready just yet
//         var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
//         if ( docReady.isReady || isIE8NotReady ) {
//             return;
//         }
//
//         trigger();
//     }
//
//     function trigger() {
//         docReady.isReady = true;
//         // process queue
//         for ( var i=0, len = queue.length; i < len; i++ ) {
//             var fn = queue[i];
//             fn();
//         }
//     }
//
//     function defineDocReady( eventie ) {
//         // trigger ready if page is ready
//         if ( document.readyState === 'complete' ) {
//             trigger();
//         } else {
//             // listen for events
//             eventie.bind( document, 'DOMContentLoaded', onReady );
//             eventie.bind( document, 'readystatechange', onReady );
//             eventie.bind( window, 'load', onReady );
//         }
//
//         return docReady;
//     }
//
// // transport
//     if ( typeof define === 'function' && define.amd ) {
//         // AMD
//         define( 'doc-ready/doc-ready',[ 'eventie/eventie' ], defineDocReady );
//     } else if ( typeof exports === 'object' ) {
//         module.exports = defineDocReady( require('eventie') );
//     } else {
//         // browser global
//         window.docReady = defineDocReady( window.eventie );
//     }
//
// })( window );
//
// /**
//  * matchesSelector v1.0.3
//  * matchesSelector( element, '.selector' )
//  * MIT license
//  */
//
// /*jshint browser: true, strict: true, undef: true, unused: true */
// /*global define: false, module: false */
//
// ( function( ElemProto ) {
//
//
//
//     var matchesMethod = ( function() {
//         // check for the standard method name first
//         if ( ElemProto.matches ) {
//             return 'matches';
//         }
//         // check un-prefixed
//         if ( ElemProto.matchesSelector ) {
//             return 'matchesSelector';
//         }
//         // check vendor prefixes
//         var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];
//
//         for ( var i=0, len = prefixes.length; i < len; i++ ) {
//             var prefix = prefixes[i];
//             var method = prefix + 'MatchesSelector';
//             if ( ElemProto[ method ] ) {
//                 return method;
//             }
//         }
//     })();
//
//     // ----- match ----- //
//
//     function match( elem, selector ) {
//         return elem[ matchesMethod ]( selector );
//     }
//
//     // ----- appendToFragment ----- //
//
//     function checkParent( elem ) {
//         // not needed if already has parent
//         if ( elem.parentNode ) {
//             return;
//         }
//         var fragment = document.createDocumentFragment();
//         fragment.appendChild( elem );
//     }
//
//     // ----- query ----- //
//
//     // fall back to using QSA
//     // thx @jonathantneal https://gist.github.com/3062955
//     function query( elem, selector ) {
//         // append to fragment if no parent
//         checkParent( elem );
//
//         // match elem with all selected elems of parent
//         var elems = elem.parentNode.querySelectorAll( selector );
//         for ( var i=0, len = elems.length; i < len; i++ ) {
//             // return true if match
//             if ( elems[i] === elem ) {
//                 return true;
//             }
//         }
//         // otherwise return false
//         return false;
//     }
//
//     // ----- matchChild ----- //
//
//     function matchChild( elem, selector ) {
//         checkParent( elem );
//         return match( elem, selector );
//     }
//
//     // ----- matchesSelector ----- //
//
//     var matchesSelector;
//
//     if ( matchesMethod ) {
//         // IE9 supports matchesSelector, but doesn't work on orphaned elems
//         // check for that
//         var div = document.createElement('div');
//         var supportsOrphans = match( div, 'div' );
//         matchesSelector = supportsOrphans ? match : matchChild;
//     } else {
//         matchesSelector = query;
//     }
//
//     // transport
//     if ( typeof define === 'function' && define.amd ) {
//         // AMD
//         define( 'matches-selector/matches-selector',[],function() {
//             return matchesSelector;
//         });
//     } else if ( typeof exports === 'object' ) {
//         module.exports = matchesSelector;
//     }
//     else {
//         // browser global
//         window.matchesSelector = matchesSelector;
//     }
//
// })( Element.prototype );
//
// /**
//  * Fizzy UI utils v1.0.1
//  * MIT license
//  */
//
// /*jshint browser: true, undef: true, unused: true, strict: true */
//
// ( function( window, factory ) {
//     /*global define: false, module: false, require: false */
//
//     // universal module definition
//
//     if ( typeof define == 'function' && define.amd ) {
//         // AMD
//         define( 'fizzy-ui-utils/utils',[
//             'doc-ready/doc-ready',
//             'matches-selector/matches-selector'
//         ], function( docReady, matchesSelector ) {
//             return factory( window, docReady, matchesSelector );
//         });
//     } else if ( typeof exports == 'object' ) {
//         // CommonJS
//         module.exports = factory(
//             window,
//             require('doc-ready'),
//             require('desandro-matches-selector')
//         );
//     } else {
//         // browser global
//         window.fizzyUIUtils = factory(
//             window,
//             window.docReady,
//             window.matchesSelector
//         );
//     }
//
// }( window, function factory( window, docReady, matchesSelector ) {
//
//
//
//     var utils = {};
//
// // ----- extend ----- //
//
// // extends objects
//     utils.extend = function( a, b ) {
//         for ( var prop in b ) {
//             a[ prop ] = b[ prop ];
//         }
//         return a;
//     };
//
// // ----- modulo ----- //
//
//     utils.modulo = function( num, div ) {
//         return ( ( num % div ) + div ) % div;
//     };
//
// // ----- isArray ----- //
//
//     var objToString = Object.prototype.toString;
//     utils.isArray = function( obj ) {
//         return objToString.call( obj ) == '[object Array]';
//     };
//
// // ----- makeArray ----- //
//
// // turn element or nodeList into an array
//     utils.makeArray = function( obj ) {
//         var ary = [];
//         if ( utils.isArray( obj ) ) {
//             // use object if already an array
//             ary = obj;
//         } else if ( obj && typeof obj.length == 'number' ) {
//             // convert nodeList to array
//             for ( var i=0, len = obj.length; i < len; i++ ) {
//                 ary.push( obj[i] );
//             }
//         } else {
//             // array of single index
//             ary.push( obj );
//         }
//         return ary;
//     };
//
// // ----- indexOf ----- //
//
// // index of helper cause IE8
//     utils.indexOf = Array.prototype.indexOf ? function( ary, obj ) {
//         return ary.indexOf( obj );
//     } : function( ary, obj ) {
//         for ( var i=0, len = ary.length; i < len; i++ ) {
//             if ( ary[i] === obj ) {
//                 return i;
//             }
//         }
//         return -1;
//     };
//
// // ----- removeFrom ----- //
//
//     utils.removeFrom = function( ary, obj ) {
//         var index = utils.indexOf( ary, obj );
//         if ( index != -1 ) {
//             ary.splice( index, 1 );
//         }
//     };
//
// // ----- isElement ----- //
//
// // http://stackoverflow.com/a/384380/182183
//     utils.isElement = ( typeof HTMLElement == 'function' || typeof HTMLElement == 'object' ) ?
//         function isElementDOM2( obj ) {
//             return obj instanceof HTMLElement;
//         } :
//         function isElementQuirky( obj ) {
//             return obj && typeof obj == 'object' &&
//                 obj.nodeType == 1 && typeof obj.nodeName == 'string';
//         };
//
// // ----- setText ----- //
//
//     utils.setText = ( function() {
//         var setTextProperty;
//         function setText( elem, text ) {
//             // only check setTextProperty once
//             setTextProperty = setTextProperty || ( document.documentElement.textContent !== undefined ? 'textContent' : 'innerText' );
//             elem[ setTextProperty ] = text;
//         }
//         return setText;
//     })();
//
// // ----- getParent ----- //
//
//     utils.getParent = function( elem, selector ) {
//         while ( elem != document.body ) {
//             elem = elem.parentNode;
//             if ( matchesSelector( elem, selector ) ) {
//                 return elem;
//             }
//         }
//     };
//
// // ----- getQueryElement ----- //
//
// // use element as selector string
//     utils.getQueryElement = function( elem ) {
//         if ( typeof elem == 'string' ) {
//             return document.querySelector( elem );
//         }
//         return elem;
//     };
//
// // ----- handleEvent ----- //
//
// // enable .ontype to trigger from .addEventListener( elem, 'type' )
//     utils.handleEvent = function( event ) {
//         var method = 'on' + event.type;
//         if ( this[ method ] ) {
//             this[ method ]( event );
//         }
//     };
//
// // ----- filterFindElements ----- //
//
//     utils.filterFindElements = function( elems, selector ) {
//         // make array of elems
//         elems = utils.makeArray( elems );
//         var ffElems = [];
//
//         for ( var i=0, len = elems.length; i < len; i++ ) {
//             var elem = elems[i];
//             // check that elem is an actual element
//             if ( !utils.isElement( elem ) ) {
//                 continue;
//             }
//             // filter & find items if we have a selector
//             if ( selector ) {
//                 // filter siblings
//                 if ( matchesSelector( elem, selector ) ) {
//                     ffElems.push( elem );
//                 }
//                 // find children
//                 var childElems = elem.querySelectorAll( selector );
//                 // concat childElems to filterFound array
//                 for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
//                     ffElems.push( childElems[j] );
//                 }
//             } else {
//                 ffElems.push( elem );
//             }
//         }
//
//         return ffElems;
//     };
//
// // ----- debounceMethod ----- //
//
//     utils.debounceMethod = function( _class, methodName, threshold ) {
//         // original method
//         var method = _class.prototype[ methodName ];
//         var timeoutName = methodName + 'Timeout';
//
//         _class.prototype[ methodName ] = function() {
//             var timeout = this[ timeoutName ];
//             if ( timeout ) {
//                 clearTimeout( timeout );
//             }
//             var args = arguments;
//
//             var _this = this;
//             this[ timeoutName ] = setTimeout( function() {
//                 method.apply( _this, args );
//                 delete _this[ timeoutName ];
//             }, threshold || 100 );
//         };
//     };
//
// // ----- htmlInit ----- //
//
// // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
//     utils.toDashed = function( str ) {
//         return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
//             return $1 + '-' + $2;
//         }).toLowerCase();
//     };
//
//     var console = window.console;
//     /**
//      * allow user to initialize classes via .js-namespace class
//      * htmlInit( Widget, 'widgetName' )
//      * options are parsed from data-namespace-option attribute
//      */
//     utils.htmlInit = function( WidgetClass, namespace ) {
//         docReady( function() {
//             var dashedNamespace = utils.toDashed( namespace );
//             var elems = document.querySelectorAll( '.js-' + dashedNamespace );
//             var dataAttr = 'data-' + dashedNamespace + '-options';
//
//             for ( var i=0, len = elems.length; i < len; i++ ) {
//                 var elem = elems[i];
//                 var attr = elem.getAttribute( dataAttr );
//                 var options;
//                 try {
//                     options = attr && JSON.parse( attr );
//                 } catch ( error ) {
//                     // log error, do not initialize
//                     if ( console ) {
//                         console.error( 'Error parsing ' + dataAttr + ' on ' +
//                             elem.nodeName.toLowerCase() + ( elem.id ? '#' + elem.id : '' ) + ': ' +
//                             error );
//                     }
//                     continue;
//                 }
//                 // initialize
//                 var instance = new WidgetClass( elem, options );
//                 // make available via $().data('layoutname')
//                 var jQuery = window.$J;
//                 if ( jQuery ) {
//                     jQuery.data( elem, namespace, instance );
//                 }
//             }
//         });
//     };
//
// // -----  ----- //
//
//     return utils;
//
// }));
//
// /**
//  * Outlayer Item
//  */
//
// ( function( window, factory ) {
//
//     // universal module definition
//     if ( typeof define === 'function' && define.amd ) {
//         // AMD
//         define( 'outlayer/item',[
//                 'eventEmitter/EventEmitter',
//                 'get-size/get-size',
//                 'get-style-property/get-style-property',
//                 'fizzy-ui-utils/utils'
//             ],
//             function( EventEmitter, getSize, getStyleProperty, utils ) {
//                 return factory( window, EventEmitter, getSize, getStyleProperty, utils );
//             }
//         );
//     } else if (typeof exports === 'object') {
//         // CommonJS
//         module.exports = factory(
//             window,
//             require('wolfy87-eventemitter'),
//             require('get-size'),
//             require('desandro-get-style-property'),
//             require('fizzy-ui-utils')
//         );
//     } else {
//         // browser global
//         window.Outlayer = {};
//         window.Outlayer.Item = factory(
//             window,
//             window.EventEmitter,
//             window.getSize,
//             window.getStyleProperty,
//             window.fizzyUIUtils
//         );
//     }
//
// }( window, function factory( window, EventEmitter, getSize, getStyleProperty, utils ) {
//
//
// // ----- helpers ----- //
//
//     var getComputedStyle = window.getComputedStyle;
//     var getStyle = getComputedStyle ?
//         function( elem ) {
//             return getComputedStyle( elem, null );
//         } :
//         function( elem ) {
//             return elem.currentStyle;
//         };
//
//
//     function isEmptyObj( obj ) {
//         for ( var prop in obj ) {
//             return false;
//         }
//         prop = null;
//         return true;
//     }
//
// // -------------------------- CSS3 support -------------------------- //
//
//     var transitionProperty = getStyleProperty('transition');
//     var transformProperty = getStyleProperty('transform');
//     var supportsCSS3 = transitionProperty && transformProperty;
//     var is3d = !!getStyleProperty('perspective');
//
//     var transitionEndEvent = {
//         WebkitTransition: 'webkitTransitionEnd',
//         MozTransition: 'transitionend',
//         OTransition: 'otransitionend',
//         transition: 'transitionend'
//     }[ transitionProperty ];
//
// // properties that could have vendor prefix
//     var prefixableProperties = [
//         'transform',
//         'transition',
//         'transitionDuration',
//         'transitionProperty'
//     ];
//
// // cache all vendor properties
//     var vendorProperties = ( function() {
//         var cache = {};
//         for ( var i=0, len = prefixableProperties.length; i < len; i++ ) {
//             var prop = prefixableProperties[i];
//             var supportedProp = getStyleProperty( prop );
//             if ( supportedProp && supportedProp !== prop ) {
//                 cache[ prop ] = supportedProp;
//             }
//         }
//         return cache;
//     })();
//
// // -------------------------- Item -------------------------- //
//
//     function Item( element, layout ) {
//         if ( !element ) {
//             return;
//         }
//
//         this.element = element;
//         // parent layout class, i.e. Masonry, Isotope, or Packery
//         this.layout = layout;
//         this.position = {
//             x: 0,
//             y: 0
//         };
//
//         this._create();
//     }
//
// // inherit EventEmitter
//     utils.extend( Item.prototype, EventEmitter.prototype );
//
//     Item.prototype._create = function() {
//         // transition objects
//         this._transn = {
//             ingProperties: {},
//             clean: {},
//             onEnd: {}
//         };
//
//         this.css({
//             position: 'absolute'
//         });
//     };
//
// // trigger specified handler for event type
//     Item.prototype.handleEvent = function( event ) {
//         var method = 'on' + event.type;
//         if ( this[ method ] ) {
//             this[ method ]( event );
//         }
//     };
//
//     Item.prototype.getSize = function() {
//         this.size = getSize( this.element );
//     };
//
//     /**
//      * apply CSS styles to element
//      * @param {Object} style
//      */
//     Item.prototype.css = function( style ) {
//         var elemStyle = this.element.style;
//
//         for ( var prop in style ) {
//             // use vendor property if available
//             var supportedProp = vendorProperties[ prop ] || prop;
//             elemStyle[ supportedProp ] = style[ prop ];
//         }
//     };
//
//     // measure position, and sets it
//     Item.prototype.getPosition = function() {
//         var style = getStyle( this.element );
//         var layoutOptions = this.layout.options;
//         var isOriginLeft = layoutOptions.isOriginLeft;
//         var isOriginTop = layoutOptions.isOriginTop;
//         var xValue = style[ isOriginLeft ? 'left' : 'right' ];
//         var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
//         // convert percent to pixels
//         var layoutSize = this.layout.size;
//         var x = xValue.indexOf('%') != -1 ?
//             ( parseFloat( xValue ) / 100 ) * layoutSize.width : parseInt( xValue, 10 );
//         var y = yValue.indexOf('%') != -1 ?
//             ( parseFloat( yValue ) / 100 ) * layoutSize.height : parseInt( yValue, 10 );
//
//         // clean up 'auto' or other non-integer values
//         x = isNaN( x ) ? 0 : x;
//         y = isNaN( y ) ? 0 : y;
//         // remove padding from measurement
//         x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
//         y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
//
//         this.position.x = x;
//         this.position.y = y;
//     };
//
// // set settled position, apply padding
//     Item.prototype.layoutPosition = function() {
//         var layoutSize = this.layout.size;
//         var layoutOptions = this.layout.options;
//         var style = {};
//
//         // x
//         var xPadding = layoutOptions.isOriginLeft ? 'paddingLeft' : 'paddingRight';
//         var xProperty = layoutOptions.isOriginLeft ? 'left' : 'right';
//         var xResetProperty = layoutOptions.isOriginLeft ? 'right' : 'left';
//
//         var x = this.position.x + layoutSize[ xPadding ];
//         // set in percentage or pixels
//         style[ xProperty ] = this.getXValue( x );
//         // reset other property
//         style[ xResetProperty ] = '';
//
//         // y
//         var yPadding = layoutOptions.isOriginTop ? 'paddingTop' : 'paddingBottom';
//         var yProperty = layoutOptions.isOriginTop ? 'top' : 'bottom';
//         var yResetProperty = layoutOptions.isOriginTop ? 'bottom' : 'top';
//
//         var y = this.position.y + layoutSize[ yPadding ];
//         // set in percentage or pixels
//         style[ yProperty ] = this.getYValue( y );
//         // reset other property
//         style[ yResetProperty ] = '';
//
//         this.css( style );
//         this.emitEvent( 'layout', [ this ] );
//     };
//
//     Item.prototype.getXValue = function( x ) {
//         var layoutOptions = this.layout.options;
//         return layoutOptions.percentPosition && !layoutOptions.isHorizontal ?
//             ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
//     };
//
//     Item.prototype.getYValue = function( y ) {
//         var layoutOptions = this.layout.options;
//         return layoutOptions.percentPosition && layoutOptions.isHorizontal ?
//             ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
//     };
//
//
//     Item.prototype._transitionTo = function( x, y ) {
//         this.getPosition();
//         // get current x & y from top/left
//         var curX = this.position.x;
//         var curY = this.position.y;
//
//         var compareX = parseInt( x, 10 );
//         var compareY = parseInt( y, 10 );
//         var didNotMove = compareX === this.position.x && compareY === this.position.y;
//
//         // save end position
//         this.setPosition( x, y );
//
//         // if did not move and not transitioning, just go to layout
//         if ( didNotMove && !this.isTransitioning ) {
//             this.layoutPosition();
//             return;
//         }
//
//         var transX = x - curX;
//         var transY = y - curY;
//         var transitionStyle = {};
//         transitionStyle.transform = this.getTranslate( transX, transY );
//
//         this.transition({
//             to: transitionStyle,
//             onTransitionEnd: {
//                 transform: this.layoutPosition
//             },
//             isCleaning: true
//         });
//     };
//
//     Item.prototype.getTranslate = function( x, y ) {
//         // flip cooridinates if origin on right or bottom
//         var layoutOptions = this.layout.options;
//         x = layoutOptions.isOriginLeft ? x : -x;
//         y = layoutOptions.isOriginTop ? y : -y;
//
//         if ( is3d ) {
//             return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
//         }
//
//         return 'translate(' + x + 'px, ' + y + 'px)';
//     };
//
// // non transition + transform support
//     Item.prototype.goTo = function( x, y ) {
//         this.setPosition( x, y );
//         this.layoutPosition();
//     };
//
// // use transition and transforms if supported
//     Item.prototype.moveTo = supportsCSS3 ?
//         Item.prototype._transitionTo : Item.prototype.goTo;
//
//     Item.prototype.setPosition = function( x, y ) {
//         this.position.x = parseInt( x, 10 );
//         this.position.y = parseInt( y, 10 );
//     };
//
// // ----- transition ----- //
//
//     /**
//      * @param {Object} style - CSS
//      * @param {Function} onTransitionEnd
//      */
//
// // non transition, just trigger callback
//     Item.prototype._nonTransition = function( args ) {
//         this.css( args.to );
//         if ( args.isCleaning ) {
//             this._removeStyles( args.to );
//         }
//         for ( var prop in args.onTransitionEnd ) {
//             args.onTransitionEnd[ prop ].call( this );
//         }
//     };
//
//     /**
//      * proper transition
//      * @param {Object} args - arguments
//      *   @param {Object} to - style to transition to
//      *   @param {Object} from - style to start transition from
//      *   @param {Boolean} isCleaning - removes transition styles after transition
//      *   @param {Function} onTransitionEnd - callback
//      */
//     Item.prototype._transition = function( args ) {
//         // redirect to nonTransition if no transition duration
//         if ( !parseFloat( this.layout.options.transitionDuration ) ) {
//             this._nonTransition( args );
//             return;
//         }
//
//         var _transition = this._transn;
//         // keep track of onTransitionEnd callback by css property
//         for ( var prop in args.onTransitionEnd ) {
//             _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
//         }
//         // keep track of properties that are transitioning
//         for ( prop in args.to ) {
//             _transition.ingProperties[ prop ] = true;
//             // keep track of properties to clean up when transition is done
//             if ( args.isCleaning ) {
//                 _transition.clean[ prop ] = true;
//             }
//         }
//
//         // set from styles
//         if ( args.from ) {
//             this.css( args.from );
//             // force redraw. http://blog.alexmaccaw.com/css-transitions
//             var h = this.element.offsetHeight;
//             // hack for JSHint to hush about unused var
//             h = null;
//         }
//         // enable transition
//         this.enableTransition( args.to );
//         // set styles that are transitioning
//         this.css( args.to );
//
//         this.isTransitioning = true;
//
//     };
//
// // dash before all cap letters, including first for
// // WebkitTransform => -webkit-transform
//     function toDashedAll( str ) {
//         return str.replace( /([A-Z])/g, function( $1 ) {
//             return '-' + $1.toLowerCase();
//         });
//     }
//
//     var transitionProps = 'opacity,' +
//         toDashedAll( vendorProperties.transform || 'transform' );
//
//     Item.prototype.enableTransition = function(/* style */) {
//         // HACK changing transitionProperty during a transition
//         // will cause transition to jump
//         if ( this.isTransitioning ) {
//             return;
//         }
//
//         // make `transition: foo, bar, baz` from style object
//         // HACK un-comment this when enableTransition can work
//         // while a transition is happening
//         // var transitionValues = [];
//         // for ( var prop in style ) {
//         //   // dash-ify camelCased properties like WebkitTransition
//         //   prop = vendorProperties[ prop ] || prop;
//         //   transitionValues.push( toDashedAll( prop ) );
//         // }
//         // enable transition styles
//         this.css({
//             transitionProperty: transitionProps,
//             transitionDuration: this.layout.options.transitionDuration
//         });
//         // listen for transition end event
//         this.element.addEventListener( transitionEndEvent, this, false );
//     };
//
//     Item.prototype.transition = Item.prototype[ transitionProperty ? '_transition' : '_nonTransition' ];
//
// // ----- events ----- //
//
//     Item.prototype.onwebkitTransitionEnd = function( event ) {
//         this.ontransitionend( event );
//     };
//
//     Item.prototype.onotransitionend = function( event ) {
//         this.ontransitionend( event );
//     };
//
// // properties that I munge to make my life easier
//     var dashedVendorProperties = {
//         '-webkit-transform': 'transform',
//         '-moz-transform': 'transform',
//         '-o-transform': 'transform'
//     };
//
//     Item.prototype.ontransitionend = function( event ) {
//         // disregard bubbled events from children
//         if ( event.target !== this.element ) {
//             return;
//         }
//         var _transition = this._transn;
//         // get property name of transitioned property, convert to prefix-free
//         var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;
//
//         // remove property that has completed transitioning
//         delete _transition.ingProperties[ propertyName ];
//         // check if any properties are still transitioning
//         if ( isEmptyObj( _transition.ingProperties ) ) {
//             // all properties have completed transitioning
//             this.disableTransition();
//         }
//         // clean style
//         if ( propertyName in _transition.clean ) {
//             // clean up style
//             this.element.style[ event.propertyName ] = '';
//             delete _transition.clean[ propertyName ];
//         }
//         // trigger onTransitionEnd callback
//         if ( propertyName in _transition.onEnd ) {
//             var onTransitionEnd = _transition.onEnd[ propertyName ];
//             onTransitionEnd.call( this );
//             delete _transition.onEnd[ propertyName ];
//         }
//
//         this.emitEvent( 'transitionEnd', [ this ] );
//     };
//
//     Item.prototype.disableTransition = function() {
//         this.removeTransitionStyles();
//         this.element.removeEventListener( transitionEndEvent, this, false );
//         this.isTransitioning = false;
//     };
//
//     /**
//      * removes style property from element
//      * @param {Object} style
//      **/
//     Item.prototype._removeStyles = function( style ) {
//         // clean up transition styles
//         var cleanStyle = {};
//         for ( var prop in style ) {
//             cleanStyle[ prop ] = '';
//         }
//         this.css( cleanStyle );
//     };
//
//     var cleanTransitionStyle = {
//         transitionProperty: '',
//         transitionDuration: ''
//     };
//
//     Item.prototype.removeTransitionStyles = function() {
//         // remove transition
//         this.css( cleanTransitionStyle );
//     };
//
// // ----- show/hide/remove ----- //
//
// // remove element from DOM
//     Item.prototype.removeElem = function() {
//         this.element.parentNode.removeChild( this.element );
//         // remove display: none
//         this.css({ display: '' });
//         this.emitEvent( 'remove', [ this ] );
//     };
//
//     Item.prototype.remove = function() {
//         // just remove element if no transition support or no transition
//         if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
//             this.removeElem();
//             return;
//         }
//
//         // start transition
//         var _this = this;
//         this.once( 'transitionEnd', function() {
//             _this.removeElem();
//         });
//         this.hide();
//     };
//
//     Item.prototype.reveal = function() {
//         delete this.isHidden;
//         // remove display: none
//         this.css({ display: '' });
//
//         var options = this.layout.options;
//
//         var onTransitionEnd = {};
//         var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
//         onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;
//
//         this.transition({
//             from: options.hiddenStyle,
//             to: options.visibleStyle,
//             isCleaning: true,
//             onTransitionEnd: onTransitionEnd
//         });
//     };
//
//     Item.prototype.onRevealTransitionEnd = function() {
//         // check if still visible
//         // during transition, item may have been hidden
//         if ( !this.isHidden ) {
//             this.emitEvent('reveal');
//         }
//     };
//
//     /**
//      * get style property use for hide/reveal transition end
//      * @param {String} styleProperty - hiddenStyle/visibleStyle
//      * @returns {String}
//      */
//     Item.prototype.getHideRevealTransitionEndProperty = function( styleProperty ) {
//         var optionStyle = this.layout.options[ styleProperty ];
//         // use opacity
//         if ( optionStyle.opacity ) {
//             return 'opacity';
//         }
//         // get first property
//         for ( var prop in optionStyle ) {
//             return prop;
//         }
//     };
//
//     Item.prototype.hide = function() {
//         // set flag
//         this.isHidden = true;
//         // remove display: none
//         this.css({ display: '' });
//
//         var options = this.layout.options;
//
//         var onTransitionEnd = {};
//         var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
//         onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;
//
//         this.transition({
//             from: options.visibleStyle,
//             to: options.hiddenStyle,
//             // keep hidden stuff hidden
//             isCleaning: true,
//             onTransitionEnd: onTransitionEnd
//         });
//     };
//
//     Item.prototype.onHideTransitionEnd = function() {
//         // check if still hidden
//         // during transition, item may have been un-hidden
//         if ( this.isHidden ) {
//             this.css({ display: 'none' });
//             this.emitEvent('hide');
//         }
//     };
//
//     Item.prototype.destroy = function() {
//         this.css({
//             position: '',
//             left: '',
//             right: '',
//             top: '',
//             bottom: '',
//             transition: '',
//             transform: ''
//         });
//     };
//
//     return Item;
//
// }));
//
// /*!
//  * Outlayer v1.4.2
//  * the brains and guts of a layout library
//  * MIT license
//  */
//
// ( function( window, factory ) {
//
//     // universal module definition
//
//     if ( typeof define == 'function' && define.amd ) {
//         // AMD
//         define( 'outlayer/outlayer',[
//                 'eventie/eventie',
//                 'eventEmitter/EventEmitter',
//                 'get-size/get-size',
//                 'fizzy-ui-utils/utils',
//                 './item'
//             ],
//             function( eventie, EventEmitter, getSize, utils, Item ) {
//                 return factory( window, eventie, EventEmitter, getSize, utils, Item);
//             }
//         );
//     } else if ( typeof exports == 'object' ) {
//         // CommonJS
//         module.exports = factory(
//             window,
//             require('eventie'),
//             require('wolfy87-eventemitter'),
//             require('get-size'),
//             require('fizzy-ui-utils'),
//             require('./item')
//         );
//     } else {
//         // browser global
//         window.Outlayer = factory(
//             window,
//             window.eventie,
//             window.EventEmitter,
//             window.getSize,
//             window.fizzyUIUtils,
//             window.Outlayer.Item
//         );
//     }
//
// }( window, function factory( window, eventie, EventEmitter, getSize, utils, Item ) {
//
//
// // ----- vars ----- //
//
//     var console = window.console;
//     var jQuery = window.$J;
//     var noop = function() {};
//
// // -------------------------- Outlayer -------------------------- //
//
// // globally unique identifiers
//     var GUID = 0;
// // internal store of all Outlayer intances
//     var instances = {};
//
//
//     /**
//      * @param {Element, String} element
//      * @param {Object} options
//      * @constructor
//      */
//     function Outlayer( element, options ) {
//         var queryElement = utils.getQueryElement( element );
//         if ( !queryElement ) {
//             if ( console ) {
//                 console.error( 'Bad element for ' + this.constructor.namespace +
//                     ': ' + ( queryElement || element ) );
//             }
//             return;
//         }
//         this.element = queryElement;
//         // add jQuery
//         if ( jQuery ) {
//             this.$element = jQuery( this.element );
//         }
//
//         // options
//         this.options = utils.extend( {}, this.constructor.defaults );
//         this.option( options );
//
//         // add id for Outlayer.getFromElement
//         var id = ++GUID;
//         this.element.outlayerGUID = id; // expando
//         instances[ id ] = this; // associate via id
//
//         // kick it off
//         this._create();
//
//         if ( this.options.isInitLayout ) {
//             this.layout();
//         }
//     }
//
// // settings are for internal use only
//     Outlayer.namespace = 'outlayer';
//     Outlayer.Item = Item;
//
// // default options
//     Outlayer.defaults = {
//         containerStyle: {
//             position: 'relative'
//         },
//         isInitLayout: true,
//         isOriginLeft: true,
//         isOriginTop: true,
//         isResizeBound: true,
//         isResizingContainer: true,
//         // item options
//         transitionDuration: '0.4s',
//         hiddenStyle: {
//             opacity: 0,
//             transform: 'scale(0.001)'
//         },
//         visibleStyle: {
//             opacity: 1,
//             transform: 'scale(1)'
//         }
//     };
//
// // inherit EventEmitter
//     utils.extend( Outlayer.prototype, EventEmitter.prototype );
//
//     /**
//      * set options
//      * @param {Object} opts
//      */
//     Outlayer.prototype.option = function( opts ) {
//         utils.extend( this.options, opts );
//     };
//
//     Outlayer.prototype._create = function() {
//         // get items from children
//         this.reloadItems();
//         // elements that affect layout, but are not laid out
//         this.stamps = [];
//         this.stamp( this.options.stamp );
//         // set container style
//         utils.extend( this.element.style, this.options.containerStyle );
//
//         // bind resize method
//         if ( this.options.isResizeBound ) {
//             this.bindResize();
//         }
//     };
//
// // goes through all children again and gets bricks in proper order
//     Outlayer.prototype.reloadItems = function() {
//         // collection of item elements
//         this.items = this._itemize( this.element.children );
//     };
//
//
//     /**
//      * turn elements into Outlayer.Items to be used in layout
//      * @param {Array or NodeList or HTMLElement} elems
//      * @returns {Array} items - collection of new Outlayer Items
//      */
//     Outlayer.prototype._itemize = function( elems ) {
//
//         var itemElems = this._filterFindItemElements( elems );
//         var Item = this.constructor.Item;
//
//         // create new Outlayer Items for collection
//         var items = [];
//         for ( var i=0, len = itemElems.length; i < len; i++ ) {
//             var elem = itemElems[i];
//             var item = new Item( elem, this );
//             items.push( item );
//         }
//
//         return items;
//     };
//
//     /**
//      * get item elements to be used in layout
//      * @param {Array or NodeList or HTMLElement} elems
//      * @returns {Array} items - item elements
//      */
//     Outlayer.prototype._filterFindItemElements = function( elems ) {
//         return utils.filterFindElements( elems, this.options.itemSelector );
//     };
//
//     /**
//      * getter method for getting item elements
//      * @returns {Array} elems - collection of item elements
//      */
//     Outlayer.prototype.getItemElements = function() {
//         var elems = [];
//         for ( var i=0, len = this.items.length; i < len; i++ ) {
//             elems.push( this.items[i].element );
//         }
//         return elems;
//     };
//
// // ----- init & layout ----- //
//
//     /**
//      * lays out all items
//      */
//     Outlayer.prototype.layout = function() {
//         this._resetLayout();
//         this._manageStamps();
//
//         // don't animate first layout
//         var isInstant = this.options.isLayoutInstant !== undefined ?
//             this.options.isLayoutInstant : !this._isLayoutInited;
//         this.layoutItems( this.items, isInstant );
//
//         // flag for initalized
//         this._isLayoutInited = true;
//     };
//
// // _init is alias for layout
//     Outlayer.prototype._init = Outlayer.prototype.layout;
//
//     /**
//      * logic before any new layout
//      */
//     Outlayer.prototype._resetLayout = function() {
//         this.getSize();
//     };
//
//
//     Outlayer.prototype.getSize = function() {
//         this.size = getSize( this.element );
//     };
//
//     /**
//      * get measurement from option, for columnWidth, rowHeight, gutter
//      * if option is String -> get element from selector string, & get size of element
//      * if option is Element -> get size of element
//      * else use option as a number
//      *
//      * @param {String} measurement
//      * @param {String} size - width or height
//      * @private
//      */
//     Outlayer.prototype._getMeasurement = function( measurement, size ) {
//         var option = this.options[ measurement ];
//         var elem;
//         if ( !option ) {
//             // default to 0
//             this[ measurement ] = 0;
//         } else {
//             // use option as an element
//             if ( typeof option === 'string' ) {
//                 elem = this.element.querySelector( option );
//             } else if ( utils.isElement( option ) ) {
//                 elem = option;
//             }
//             // use size of element, if element
//             this[ measurement ] = elem ? getSize( elem )[ size ] : option;
//         }
//     };
//
//     /**
//      * layout a collection of item elements
//      * @api public
//      */
//     Outlayer.prototype.layoutItems = function( items, isInstant ) {
//         items = this._getItemsForLayout( items );
//
//         this._layoutItems( items, isInstant );
//
//         this._postLayout();
//     };
//
//     /**
//      * get the items to be laid out
//      * you may want to skip over some items
//      * @param {Array} items
//      * @returns {Array} items
//      */
//     Outlayer.prototype._getItemsForLayout = function( items ) {
//         var layoutItems = [];
//         for ( var i=0, len = items.length; i < len; i++ ) {
//             var item = items[i];
//             if ( !item.isIgnored ) {
//                 layoutItems.push( item );
//             }
//         }
//         return layoutItems;
//     };
//
//     /**
//      * layout items
//      * @param {Array} items
//      * @param {Boolean} isInstant
//      */
//     Outlayer.prototype._layoutItems = function( items, isInstant ) {
//         this._emitCompleteOnItems( 'layout', items );
//
//         if ( !items || !items.length ) {
//             // no items, emit event with empty array
//             return;
//         }
//
//         var queue = [];
//
//         for ( var i=0, len = items.length; i < len; i++ ) {
//             var item = items[i];
//             // get x/y object from method
//             var position = this._getItemLayoutPosition( item );
//             // enqueue
//             position.item = item;
//             position.isInstant = isInstant || item.isLayoutInstant;
//             queue.push( position );
//         }
//
//         this._processLayoutQueue( queue );
//     };
//
//     /**
//      * get item layout position
//      * @param {Outlayer.Item} item
//      * @returns {Object} x and y position
//      */
//     Outlayer.prototype._getItemLayoutPosition = function( /* item */ ) {
//         return {
//             x: 0,
//             y: 0
//         };
//     };
//
//     /**
//      * iterate over array and position each item
//      * Reason being - separating this logic prevents 'layout invalidation'
//      * thx @paul_irish
//      * @param {Array} queue
//      */
//     Outlayer.prototype._processLayoutQueue = function( queue ) {
//         for ( var i=0, len = queue.length; i < len; i++ ) {
//             var obj = queue[i];
//             this._positionItem( obj.item, obj.x, obj.y, obj.isInstant );
//         }
//     };
//
//     /**
//      * Sets position of item in DOM
//      * @param {Outlayer.Item} item
//      * @param {Number} x - horizontal position
//      * @param {Number} y - vertical position
//      * @param {Boolean} isInstant - disables transitions
//      */
//     Outlayer.prototype._positionItem = function( item, x, y, isInstant ) {
//         if ( isInstant ) {
//             // if not transition, just set CSS
//             item.goTo( x, y );
//         } else {
//             item.moveTo( x, y );
//         }
//     };
//
//     /**
//      * Any logic you want to do after each layout,
//      * i.e. size the container
//      */
//     Outlayer.prototype._postLayout = function() {
//         this.resizeContainer();
//     };
//
//     Outlayer.prototype.resizeContainer = function() {
//         if ( !this.options.isResizingContainer ) {
//             return;
//         }
//         var size = this._getContainerSize();
//         if ( size ) {
//             this._setContainerMeasure( size.width, true );
//             this._setContainerMeasure( size.height, false );
//         }
//     };
//
//     /**
//      * Sets width or height of container if returned
//      * @returns {Object} size
//      *   @param {Number} width
//      *   @param {Number} height
//      */
//     Outlayer.prototype._getContainerSize = noop;
//
//     /**
//      * @param {Number} measure - size of width or height
//      * @param {Boolean} isWidth
//      */
//     Outlayer.prototype._setContainerMeasure = function( measure, isWidth ) {
//         if ( measure === undefined ) {
//             return;
//         }
//
//         var elemSize = this.size;
//         // add padding and border width if border box
//         if ( elemSize.isBorderBox ) {
//             measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
//                 elemSize.borderLeftWidth + elemSize.borderRightWidth :
//                 elemSize.paddingBottom + elemSize.paddingTop +
//                 elemSize.borderTopWidth + elemSize.borderBottomWidth;
//         }
//
//         measure = Math.max( measure, 0 );
//         this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
//     };
//
//     /**
//      * emit eventComplete on a collection of items events
//      * @param {String} eventName
//      * @param {Array} items - Outlayer.Items
//      */
//     Outlayer.prototype._emitCompleteOnItems = function( eventName, items ) {
//         var _this = this;
//         function onComplete() {
//             _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
//         }
//
//         var count = items.length;
//         if ( !items || !count ) {
//             onComplete();
//             return;
//         }
//
//         var doneCount = 0;
//         function tick() {
//             doneCount++;
//             if ( doneCount === count ) {
//                 onComplete();
//             }
//         }
//
//         // bind callback
//         for ( var i=0, len = items.length; i < len; i++ ) {
//             var item = items[i];
//             item.once( eventName, tick );
//         }
//     };
//
//     /**
//      * emits events via eventEmitter and jQuery events
//      * @param {String} type - name of event
//      * @param {Event} event - original event
//      * @param {Array} args - extra arguments
//      */
//     Outlayer.prototype.dispatchEvent = function( type, event, args ) {
//         // add original event to arguments
//         var emitArgs = event ? [ event ].concat( args ) : args;
//         this.emitEvent( type, emitArgs );
//
//         if ( jQuery ) {
//             // set this.$element
//             this.$element = this.$element || jQuery( this.element );
//             if ( event ) {
//                 // create jQuery event
//                 var $event = jQuery.Event( event );
//                 $event.type = type;
//                 this.$element.trigger( $event, args );
//             } else {
//                 // just trigger with type if no event available
//                 this.$element.trigger( type, args );
//             }
//         }
//     };
//
// // -------------------------- ignore & stamps -------------------------- //
//
//
//     /**
//      * keep item in collection, but do not lay it out
//      * ignored items do not get skipped in layout
//      * @param {Element} elem
//      */
//     Outlayer.prototype.ignore = function( elem ) {
//         var item = this.getItem( elem );
//         if ( item ) {
//             item.isIgnored = true;
//         }
//     };
//
//     /**
//      * return item to layout collection
//      * @param {Element} elem
//      */
//     Outlayer.prototype.unignore = function( elem ) {
//         var item = this.getItem( elem );
//         if ( item ) {
//             delete item.isIgnored;
//         }
//     };
//
//     /**
//      * adds elements to stamps
//      * @param {NodeList, Array, Element, or String} elems
//      */
//     Outlayer.prototype.stamp = function( elems ) {
//         elems = this._find( elems );
//         if ( !elems ) {
//             return;
//         }
//
//         this.stamps = this.stamps.concat( elems );
//         // ignore
//         for ( var i=0, len = elems.length; i < len; i++ ) {
//             var elem = elems[i];
//             this.ignore( elem );
//         }
//     };
//
//     /**
//      * removes elements to stamps
//      * @param {NodeList, Array, or Element} elems
//      */
//     Outlayer.prototype.unstamp = function( elems ) {
//         elems = this._find( elems );
//         if ( !elems ){
//             return;
//         }
//
//         for ( var i=0, len = elems.length; i < len; i++ ) {
//             var elem = elems[i];
//             // filter out removed stamp elements
//             utils.removeFrom( this.stamps, elem );
//             this.unignore( elem );
//         }
//
//     };
//
//     /**
//      * finds child elements
//      * @param {NodeList, Array, Element, or String} elems
//      * @returns {Array} elems
//      */
//     Outlayer.prototype._find = function( elems ) {
//         if ( !elems ) {
//             return;
//         }
//         // if string, use argument as selector string
//         if ( typeof elems === 'string' ) {
//             elems = this.element.querySelectorAll( elems );
//         }
//         elems = utils.makeArray( elems );
//         return elems;
//     };
//
//     Outlayer.prototype._manageStamps = function() {
//         if ( !this.stamps || !this.stamps.length ) {
//             return;
//         }
//
//         this._getBoundingRect();
//
//         for ( var i=0, len = this.stamps.length; i < len; i++ ) {
//             var stamp = this.stamps[i];
//             this._manageStamp( stamp );
//         }
//     };
//
// // update boundingLeft / Top
//     Outlayer.prototype._getBoundingRect = function() {
//         // get bounding rect for container element
//         var boundingRect = this.element.getBoundingClientRect();
//         var size = this.size;
//         this._boundingRect = {
//             left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
//             top: boundingRect.top + size.paddingTop + size.borderTopWidth,
//             right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
//             bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
//         };
//     };
//
//     /**
//      * @param {Element} stamp
//      **/
//     Outlayer.prototype._manageStamp = noop;
//
//     /**
//      * get x/y position of element relative to container element
//      * @param {Element} elem
//      * @returns {Object} offset - has left, top, right, bottom
//      */
//     Outlayer.prototype._getElementOffset = function( elem ) {
//         var boundingRect = elem.getBoundingClientRect();
//         var thisRect = this._boundingRect;
//         var size = getSize( elem );
//         var offset = {
//             left: boundingRect.left - thisRect.left - size.marginLeft,
//             top: boundingRect.top - thisRect.top - size.marginTop,
//             right: thisRect.right - boundingRect.right - size.marginRight,
//             bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
//         };
//         return offset;
//     };
//
// // -------------------------- resize -------------------------- //
//
// // enable event handlers for listeners
// // i.e. resize -> onresize
//     Outlayer.prototype.handleEvent = function( event ) {
//         var method = 'on' + event.type;
//         if ( this[ method ] ) {
//             this[ method ]( event );
//         }
//     };
//
//     /**
//      * Bind layout to window resizing
//      */
//     Outlayer.prototype.bindResize = function() {
//         // bind just one listener
//         if ( this.isResizeBound ) {
//             return;
//         }
//         eventie.bind( window, 'resize', this );
//         this.isResizeBound = true;
//     };
//
//     /**
//      * Unbind layout to window resizing
//      */
//     Outlayer.prototype.unbindResize = function() {
//         if ( this.isResizeBound ) {
//             eventie.unbind( window, 'resize', this );
//         }
//         this.isResizeBound = false;
//     };
//
// // original debounce by John Hann
// // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
//
// // this fires every resize
//     Outlayer.prototype.onresize = function() {
//         if ( this.resizeTimeout ) {
//             clearTimeout( this.resizeTimeout );
//         }
//
//         var _this = this;
//         function delayed() {
//             _this.resize();
//             delete _this.resizeTimeout;
//         }
//
//         this.resizeTimeout = setTimeout( delayed, 100 );
//     };
//
// // debounced, layout on resize
//     Outlayer.prototype.resize = function() {
//         // don't trigger if size did not change
//         // or if resize was unbound. See #9
//         if ( !this.isResizeBound || !this.needsResizeLayout() ) {
//             return;
//         }
//
//         this.layout();
//     };
//
//     /**
//      * check if layout is needed post layout
//      * @returns Boolean
//      */
//     Outlayer.prototype.needsResizeLayout = function() {
//         var size = getSize( this.element );
//         // check that this.size and size are there
//         // IE8 triggers resize on body size change, so they might not be
//         var hasSizes = this.size && size;
//         return hasSizes && size.innerWidth !== this.size.innerWidth;
//     };
//
// // -------------------------- methods -------------------------- //
//
//     /**
//      * add items to Outlayer instance
//      * @param {Array or NodeList or Element} elems
//      * @returns {Array} items - Outlayer.Items
//      **/
//     Outlayer.prototype.addItems = function( elems ) {
//         var items = this._itemize( elems );
//         // add items to collection
//         if ( items.length ) {
//             this.items = this.items.concat( items );
//         }
//         return items;
//     };
//
//     /**
//      * Layout newly-appended item elements
//      * @param {Array or NodeList or Element} elems
//      */
//     Outlayer.prototype.appended = function( elems ) {
//         var items = this.addItems( elems );
//         if ( !items.length ) {
//             return;
//         }
//         // layout and reveal just the new items
//         this.layoutItems( items, true );
//         this.reveal( items );
//     };
//
//     /**
//      * Layout prepended elements
//      * @param {Array or NodeList or Element} elems
//      */
//     Outlayer.prototype.prepended = function( elems ) {
//         var items = this._itemize( elems );
//         if ( !items.length ) {
//             return;
//         }
//         // add items to beginning of collection
//         var previousItems = this.items.slice(0);
//         this.items = items.concat( previousItems );
//         // start new layout
//         this._resetLayout();
//         this._manageStamps();
//         // layout new stuff without transition
//         this.layoutItems( items, true );
//         this.reveal( items );
//         // layout previous items
//         this.layoutItems( previousItems );
//     };
//
//     /**
//      * reveal a collection of items
//      * @param {Array of Outlayer.Items} items
//      */
//     Outlayer.prototype.reveal = function( items ) {
//         this._emitCompleteOnItems( 'reveal', items );
//
//         var len = items && items.length;
//         for ( var i=0; len && i < len; i++ ) {
//             var item = items[i];
//             item.reveal();
//         }
//     };
//
//     /**
//      * hide a collection of items
//      * @param {Array of Outlayer.Items} items
//      */
//     Outlayer.prototype.hide = function( items ) {
//         this._emitCompleteOnItems( 'hide', items );
//
//         var len = items && items.length;
//         for ( var i=0; len && i < len; i++ ) {
//             var item = items[i];
//             item.hide();
//         }
//     };
//
//     /**
//      * reveal item elements
//      * @param {Array}, {Element}, {NodeList} items
//      */
//     Outlayer.prototype.revealItemElements = function( elems ) {
//         var items = this.getItems( elems );
//         this.reveal( items );
//     };
//
//     /**
//      * hide item elements
//      * @param {Array}, {Element}, {NodeList} items
//      */
//     Outlayer.prototype.hideItemElements = function( elems ) {
//         var items = this.getItems( elems );
//         this.hide( items );
//     };
//
//     /**
//      * get Outlayer.Item, given an Element
//      * @param {Element} elem
//      * @param {Function} callback
//      * @returns {Outlayer.Item} item
//      */
//     Outlayer.prototype.getItem = function( elem ) {
//         // loop through items to get the one that matches
//         for ( var i=0, len = this.items.length; i < len; i++ ) {
//             var item = this.items[i];
//             if ( item.element === elem ) {
//                 // return item
//                 return item;
//             }
//         }
//     };
//
//     /**
//      * get collection of Outlayer.Items, given Elements
//      * @param {Array} elems
//      * @returns {Array} items - Outlayer.Items
//      */
//     Outlayer.prototype.getItems = function( elems ) {
//         elems = utils.makeArray( elems );
//         var items = [];
//         for ( var i=0, len = elems.length; i < len; i++ ) {
//             var elem = elems[i];
//             var item = this.getItem( elem );
//             if ( item ) {
//                 items.push( item );
//             }
//         }
//
//         return items;
//     };
//
//     /**
//      * remove element(s) from instance and DOM
//      * @param {Array or NodeList or Element} elems
//      */
//     Outlayer.prototype.remove = function( elems ) {
//         var removeItems = this.getItems( elems );
//
//         this._emitCompleteOnItems( 'remove', removeItems );
//
//         // bail if no items to remove
//         if ( !removeItems || !removeItems.length ) {
//             return;
//         }
//
//         for ( var i=0, len = removeItems.length; i < len; i++ ) {
//             var item = removeItems[i];
//             item.remove();
//             // remove item from collection
//             utils.removeFrom( this.items, item );
//         }
//     };
//
// // ----- destroy ----- //
//
// // remove and disable Outlayer instance
//     Outlayer.prototype.destroy = function() {
//         // clean up dynamic styles
//         var style = this.element.style;
//         style.height = '';
//         style.position = '';
//         style.width = '';
//         // destroy items
//         for ( var i=0, len = this.items.length; i < len; i++ ) {
//             var item = this.items[i];
//             item.destroy();
//         }
//
//         this.unbindResize();
//
//         var id = this.element.outlayerGUID;
//         delete instances[ id ]; // remove reference to instance by id
//         delete this.element.outlayerGUID;
//         // remove data for jQuery
//         if ( jQuery ) {
//             jQuery.removeData( this.element, this.constructor.namespace );
//         }
//
//     };
//
// // -------------------------- data -------------------------- //
//
//     /**
//      * get Outlayer instance from element
//      * @param {Element} elem
//      * @returns {Outlayer}
//      */
//     Outlayer.data = function( elem ) {
//         elem = utils.getQueryElement( elem );
//         var id = elem && elem.outlayerGUID;
//         return id && instances[ id ];
//     };
//
//
// // -------------------------- create Outlayer class -------------------------- //
//
//     /**
//      * create a layout class
//      * @param {String} namespace
//      */
//     Outlayer.create = function( namespace, options ) {
//         // sub-class Outlayer
//         function Layout() {
//             Outlayer.apply( this, arguments );
//         }
//         // inherit Outlayer prototype, use Object.create if there
//         if ( Object.create ) {
//             Layout.prototype = Object.create( Outlayer.prototype );
//         } else {
//             utils.extend( Layout.prototype, Outlayer.prototype );
//         }
//         // set contructor, used for namespace and Item
//         Layout.prototype.constructor = Layout;
//
//         Layout.defaults = utils.extend( {}, Outlayer.defaults );
//         // apply new options
//         utils.extend( Layout.defaults, options );
//         // keep prototype.settings for backwards compatibility (Packery v1.2.0)
//         Layout.prototype.settings = {};
//
//         Layout.namespace = namespace;
//
//         Layout.data = Outlayer.data;
//
//         // sub-class Item
//         Layout.Item = function LayoutItem() {
//             Item.apply( this, arguments );
//         };
//
//         Layout.Item.prototype = new Item();
//
//         // -------------------------- declarative -------------------------- //
//
//         utils.htmlInit( Layout, namespace );
//
//         // -------------------------- jQuery bridge -------------------------- //
//
//         // make into jQuery plugin
//         if ( jQuery && jQuery.bridget ) {
//             jQuery.bridget( namespace, Layout );
//         }
//
//         return Layout;
//     };
//
// // ----- fin ----- //
//
// // back in global
//     Outlayer.Item = Item;
//
//     return Outlayer;
//
// }));
//
//
// /*!
//  * Masonry v3.3.2
//  * Cascading grid layout library
//  * http://masonry.desandro.com
//  * MIT License
//  * by David DeSandro
//  */
//
// ( function( window, factory ) {
//
//     // universal module definition
//     if ( typeof define === 'function' && define.amd ) {
//         // AMD
//         define( [
//                 'outlayer/outlayer',
//                 'get-size/get-size',
//                 'fizzy-ui-utils/utils'
//             ],
//             factory );
//     } else if ( typeof exports === 'object' ) {
//         // CommonJS
//         module.exports = factory(
//             require('outlayer'),
//             require('get-size'),
//             require('fizzy-ui-utils')
//         );
//     } else {
//         // browser global
//         window.Masonry = factory(
//             window.Outlayer,
//             window.getSize,
//             window.fizzyUIUtils
//         );
//     }
//
// }( window, function factory( Outlayer, getSize, utils ) {
//
//
//
// // -------------------------- masonryDefinition -------------------------- //
//
//     // create an Outlayer layout class
//     var Masonry = Outlayer.create('masonry');
//
//     Masonry.prototype._resetLayout = function() {
//         this.getSize();
//         this._getMeasurement( 'columnWidth', 'outerWidth' );
//         this._getMeasurement( 'gutter', 'outerWidth' );
//         this.measureColumns();
//
//         // reset column Y
//         var i = this.cols;
//         this.colYs = [];
//         while (i--) {
//             this.colYs.push( 0 );
//         }
//
//         this.maxY = 0;
//     };
//
//     Masonry.prototype.measureColumns = function() {
//         this.getContainerWidth();
//         // if columnWidth is 0, default to outerWidth of first item
//         if ( !this.columnWidth ) {
//             var firstItem = this.items[0];
//             var firstItemElem = firstItem && firstItem.element;
//             // columnWidth fall back to item of first element
//             this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
//                 // if first elem has no width, default to size of container
//                 this.containerWidth;
//         }
//
//         var columnWidth = this.columnWidth += this.gutter;
//
//         // calculate columns
//         var containerWidth = this.containerWidth + this.gutter;
//         var cols = containerWidth / columnWidth;
//         // fix rounding errors, typically with gutters
//         var excess = columnWidth - containerWidth % columnWidth;
//         // if overshoot is less than a pixel, round up, otherwise floor it
//         var mathMethod = excess && excess < 1 ? 'round' : 'floor';
//         cols = Math[ mathMethod ]( cols );
//         this.cols = Math.max( cols, 1 );
//     };
//
//     Masonry.prototype.getContainerWidth = function() {
//         // container is parent if fit width
//         var container = this.options.isFitWidth ? this.element.parentNode : this.element;
//         // check that this.size and size are there
//         // IE8 triggers resize on body size change, so they might not be
//         var size = getSize( container );
//         this.containerWidth = size && size.innerWidth;
//     };
//
//     Masonry.prototype._getItemLayoutPosition = function( item ) {
//         item.getSize();
//         // how many columns does this brick span
//         var remainder = item.size.outerWidth % this.columnWidth;
//         var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
//         // round if off by 1 pixel, otherwise use ceil
//         var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
//         colSpan = Math.min( colSpan, this.cols );
//
//         var colGroup = this._getColGroup( colSpan );
//         // get the minimum Y value from the columns
//         var minimumY = Math.min.apply( Math, colGroup );
//         var shortColIndex = utils.indexOf( colGroup, minimumY );
//
//         // position the brick
//         var position = {
//             x: this.columnWidth * shortColIndex,
//             y: minimumY
//         };
//
//         // apply setHeight to necessary columns
//         var setHeight = minimumY + item.size.outerHeight;
//         var setSpan = this.cols + 1 - colGroup.length;
//         for ( var i = 0; i < setSpan; i++ ) {
//             this.colYs[ shortColIndex + i ] = setHeight;
//         }
//
//         return position;
//     };
//
//     /**
//      * @param {Number} colSpan - number of columns the element spans
//      * @returns {Array} colGroup
//      */
//     Masonry.prototype._getColGroup = function( colSpan ) {
//         if ( colSpan < 2 ) {
//             // if brick spans only one column, use all the column Ys
//             return this.colYs;
//         }
//
//         var colGroup = [];
//         // how many different places could this brick fit horizontally
//         var groupCount = this.cols + 1 - colSpan;
//         // for each group potential horizontal position
//         for ( var i = 0; i < groupCount; i++ ) {
//             // make an array of colY values for that one group
//             var groupColYs = this.colYs.slice( i, i + colSpan );
//             // and get the max value of the array
//             colGroup[i] = Math.max.apply( Math, groupColYs );
//         }
//         return colGroup;
//     };
//
//     Masonry.prototype._manageStamp = function( stamp ) {
//         var stampSize = getSize( stamp );
//         var offset = this._getElementOffset( stamp );
//         // get the columns that this stamp affects
//         var firstX = this.options.isOriginLeft ? offset.left : offset.right;
//         var lastX = firstX + stampSize.outerWidth;
//         var firstCol = Math.floor( firstX / this.columnWidth );
//         firstCol = Math.max( 0, firstCol );
//         var lastCol = Math.floor( lastX / this.columnWidth );
//         // lastCol should not go over if multiple of columnWidth #425
//         lastCol -= lastX % this.columnWidth ? 0 : 1;
//         lastCol = Math.min( this.cols - 1, lastCol );
//         // set colYs to bottom of the stamp
//         var stampMaxY = ( this.options.isOriginTop ? offset.top : offset.bottom ) +
//             stampSize.outerHeight;
//         for ( var i = firstCol; i <= lastCol; i++ ) {
//             this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
//         }
//     };
//
//     Masonry.prototype._getContainerSize = function() {
//         this.maxY = Math.max.apply( Math, this.colYs );
//         var size = {
//             height: this.maxY
//         };
//
//         if ( this.options.isFitWidth ) {
//             size.width = this._getContainerFitWidth();
//         }
//
//         return size;
//     };
//
//     Masonry.prototype._getContainerFitWidth = function() {
//         var unusedCols = 0;
//         // count unused columns
//         var i = this.cols;
//         while ( --i ) {
//             if ( this.colYs[i] !== 0 ) {
//                 break;
//             }
//             unusedCols++;
//         }
//         // fit container to columns that have been used
//         return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
//     };
//
//     Masonry.prototype.needsResizeLayout = function() {
//         var previousWidth = this.containerWidth;
//         this.getContainerWidth();
//         return previousWidth !== this.containerWidth;
//     };
//
//     return Masonry;
//
// }));
//
// /*!
//  * fancyBox - $J Plugin
//  * version: 2.1.5 (Fri, 14 Jun 2013)
//  * @requires $J v1.6 or later
//  *
//  * Examples at http://fancyapps.com/fancybox/
//  * License: www.fancyapps.com/fancybox/#license
//  *
//  * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
//  *
//  */
//
// (function (window, document, $, undefined) {
//     "use strict";
//
//     var H = $("html"),
//         W = $(window),
//         D = $(document),
//         F = $.fancybox = function () {
//             F.open.apply( this, arguments );
//         },
//         IE =  navigator.userAgent.match(/msie/i),
//         didUpdate	= null,
//         isTouch		= document.createTouch !== undefined,
//
//         isQuery	= function(obj) {
//             return obj && obj.hasOwnProperty && obj instanceof $;
//         },
//         isString = function(str) {
//             return str && $.type(str) === "string";
//         },
//         isPercentage = function(str) {
//             return isString(str) && str.indexOf('%') > 0;
//         },
//         isScrollable = function(el) {
//             return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
//         },
//         getScalar = function(orig, dim) {
//             var value = parseInt(orig, 10) || 0;
//
//             if (dim && isPercentage(orig)) {
//                 value = F.getViewport()[ dim ] / 100 * value;
//             }
//
//             return Math.ceil(value);
//         },
//         getValue = function(value, dim) {
//             return getScalar(value, dim) + 'px';
//         };
//
//     $.extend(F, {
//         // The current version of fancyBox
//         version: '2.1.5',
//
//         defaults: {
//             padding : 15,
//             margin  : 20,
//
//             width     : 800,
//             height    : 600,
//             minWidth  : 100,
//             minHeight : 100,
//             maxWidth  : 9999,
//             maxHeight : 9999,
//             pixelRatio: 1, // Set to 2 for retina display support
//
//             autoSize   : true,
//             autoHeight : false,
//             autoWidth  : false,
//
//             autoResize  : true,
//             autoCenter  : !isTouch,
//             fitToView   : true,
//             aspectRatio : false,
//             topRatio    : 0.5,
//             leftRatio   : 0.5,
//
//             scrolling : 'auto', // 'auto', 'yes' or 'no'
//             wrapCSS   : '',
//
//             arrows     : true,
//             closeBtn   : true,
//             closeClick : false,
//             nextClick  : false,
//             mouseWheel : true,
//             autoPlay   : false,
//             playSpeed  : 3000,
//             preload    : 3,
//             modal      : false,
//             loop       : true,
//
//             ajax  : {
//                 dataType : 'html',
//                 headers  : { 'X-fancyBox': true }
//             },
//             iframe : {
//                 scrolling : 'auto',
//                 preload   : true
//             },
//             swf : {
//                 wmode: 'transparent',
//                 allowfullscreen   : 'true',
//                 allowscriptaccess : 'always'
//             },
//
//             keys  : {
//                 next : {
//                     13 : 'left', // enter
//                     34 : 'up',   // page down
//                     39 : 'left', // right arrow
//                     40 : 'up'    // down arrow
//                 },
//                 prev : {
//                     8  : 'right',  // backspace
//                     33 : 'down',   // page up
//                     37 : 'right',  // left arrow
//                     38 : 'down'    // up arrow
//                 },
//                 close  : [27], // escape key
//                 play   : [32], // space - start/stop slideshow
//                 toggle : [70]  // letter "f" - toggle fullscreen
//             },
//
//             direction : {
//                 next : 'left',
//                 prev : 'right'
//             },
//
//             scrollOutside  : true,
//
//             // Override some properties
//             index   : 0,
//             type    : null,
//             href    : null,
//             content : null,
//             title   : null,
//
//             // HTML templates
//             tpl: {
//                 wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
//                 image    : '<img class="fancybox-image" src="{href}" alt="" />',
//                 iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
//                 error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
//                 closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
//                 next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
//                 prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
//             },
//
//             // Properties for each animation type
//             // Opening fancyBox
//             openEffect  : 'fade', // 'elastic', 'fade' or 'none'
//             openSpeed   : 250,
//             openEasing  : 'swing',
//             openOpacity : true,
//             openMethod  : 'zoomIn',
//
//             // Closing fancyBox
//             closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
//             closeSpeed   : 250,
//             closeEasing  : 'swing',
//             closeOpacity : true,
//             closeMethod  : 'zoomOut',
//
//             // Changing next gallery item
//             nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
//             nextSpeed  : 250,
//             nextEasing : 'swing',
//             nextMethod : 'changeIn',
//
//             // Changing previous gallery item
//             prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
//             prevSpeed  : 250,
//             prevEasing : 'swing',
//             prevMethod : 'changeOut',
//
//             // Enable default helpers
//             helpers : {
//                 overlay : true,
//                 title   : true
//             },
//
//             // Callbacks
//             onCancel     : $.noop, // If canceling
//             beforeLoad   : $.noop, // Before loading
//             afterLoad    : $.noop, // After loading
//             beforeShow   : $.noop, // Before changing in current item
//             afterShow    : $.noop, // After opening
//             beforeChange : $.noop, // Before changing gallery item
//             beforeClose  : $.noop, // Before closing
//             afterClose   : $.noop  // After closing
//         },
//
//         //Current state
//         group    : {}, // Selected group
//         opts     : {}, // Group options
//         previous : null,  // Previous element
//         coming   : null,  // Element being loaded
//         current  : null,  // Currently loaded element
//         isActive : false, // Is activated
//         isOpen   : false, // Is currently open
//         isOpened : false, // Have been fully opened at least once
//
//         wrap  : null,
//         skin  : null,
//         outer : null,
//         inner : null,
//
//         player : {
//             timer    : null,
//             isActive : false
//         },
//
//         // Loaders
//         ajaxLoad   : null,
//         imgPreload : null,
//
//         // Some collections
//         transitions : {},
//         helpers     : {},
//
//         /*
// 		 *	Static methods
// 		 */
//
//         open: function (group, opts) {
//             if (!group) {
//                 return;
//             }
//
//             if (!$.isPlainObject(opts)) {
//                 opts = {};
//             }
//
//             // Close if already active
//             if (false === F.close(true)) {
//                 return;
//             }
//
//             // Normalize group
//             if (!$.isArray(group)) {
//                 group = isQuery(group) ? $(group).get() : [group];
//             }
//
//             // Recheck if the type of each element is `object` and set content type (image, ajax, etc)
//             $.each(group, function(i, element) {
//                 var obj = {},
//                     href,
//                     title,
//                     content,
//                     type,
//                     rez,
//                     hrefParts,
//                     selector;
//
//                 if ($.type(element) === "object") {
//                     // Check if is DOM element
//                     if (element.nodeType) {
//                         element = $(element);
//                     }
//
//                     if (isQuery(element)) {
//                         obj = {
//                             href    : element.data('fancybox-href') || element.attr('href'),
//                             title   : element.data('fancybox-title') || element.attr('title'),
//                             isDom   : true,
//                             element : element
//                         };
//
//                         if ($.metadata) {
//                             $.extend(true, obj, element.metadata());
//                         }
//
//                     } else {
//                         obj = element;
//                     }
//                 }
//
//                 href  = opts.href  || obj.href || (isString(element) ? element : null);
//                 title = opts.title !== undefined ? opts.title : obj.title || '';
//
//                 content = opts.content || obj.content;
//                 type    = content ? 'html' : (opts.type  || obj.type);
//
//                 if (!type && obj.isDom) {
//                     type = element.data('fancybox-type');
//
//                     if (!type) {
//                         rez  = element.prop('class').match(/fancybox\.(\w+)/);
//                         type = rez ? rez[1] : null;
//                     }
//                 }
//
//                 if (isString(href)) {
//                     // Try to guess the content type
//                     if (!type) {
//                         if (F.isImage(href)) {
//                             type = 'image';
//
//                         } else if (F.isSWF(href)) {
//                             type = 'swf';
//
//                         } else if (href.charAt(0) === '#') {
//                             type = 'inline';
//
//                         } else if (isString(element)) {
//                             type    = 'html';
//                             content = element;
//                         }
//                     }
//
//                     // Split url into two pieces with source url and content selector, e.g,
//                     // "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
//                     if (type === 'ajax') {
//                         hrefParts = href.split(/\s+/, 2);
//                         href      = hrefParts.shift();
//                         selector  = hrefParts.shift();
//                     }
//                 }
//
//                 if (!content) {
//                     if (type === 'inline') {
//                         if (href) {
//                             content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7
//
//                         } else if (obj.isDom) {
//                             content = element;
//                         }
//
//                     } else if (type === 'html') {
//                         content = href;
//
//                     } else if (!type && !href && obj.isDom) {
//                         type    = 'inline';
//                         content = element;
//                     }
//                 }
//
//                 $.extend(obj, {
//                     href     : href,
//                     type     : type,
//                     content  : content,
//                     title    : title,
//                     selector : selector
//                 });
//
//                 group[ i ] = obj;
//             });
//
//             // Extend the defaults
//             F.opts = $.extend(true, {}, F.defaults, opts);
//
//             // All options are merged recursive except keys
//             if (opts.keys !== undefined) {
//                 F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
//             }
//
//             F.group = group;
//
//             return F._start(F.opts.index);
//         },
//
//         // Cancel image loading or abort ajax request
//         cancel: function () {
//             var coming = F.coming;
//
//             if (!coming || false === F.trigger('onCancel')) {
//                 return;
//             }
//
//             F.hideLoading();
//
//             if (F.ajaxLoad) {
//                 F.ajaxLoad.abort();
//             }
//
//             F.ajaxLoad = null;
//
//             if (F.imgPreload) {
//                 F.imgPreload.onload = F.imgPreload.onerror = null;
//             }
//
//             if (coming.wrap) {
//                 coming.wrap.stop(true, true).trigger('onReset').remove();
//             }
//
//             F.coming = null;
//
//             // If the first item has been canceled, then clear everything
//             if (!F.current) {
//                 F._afterZoomOut( coming );
//             }
//         },
//
//         // Start closing animation if is open; remove immediately if opening/closing
//         close: function (event) {
//             F.cancel();
//
//             if (false === F.trigger('beforeClose')) {
//                 return;
//             }
//
//             F.unbindEvents();
//
//             if (!F.isActive) {
//                 return;
//             }
//
//             if (!F.isOpen || event === true) {
//                 $('.fancybox-wrap').stop(true).trigger('onReset').remove();
//
//                 F._afterZoomOut();
//
//             } else {
//                 F.isOpen = F.isOpened = false;
//                 F.isClosing = true;
//
//                 $('.fancybox-item, .fancybox-nav').remove();
//
//                 F.wrap.stop(true, true).removeClass('fancybox-opened');
//
//                 F.transitions[ F.current.closeMethod ]();
//             }
//         },
//
//         // Manage slideshow:
//         //   $.fancybox.play(); - toggle slideshow
//         //   $.fancybox.play( true ); - start
//         //   $.fancybox.play( false ); - stop
//         play: function ( action ) {
//             var clear = function () {
//                     clearTimeout(F.player.timer);
//                 },
//                 set = function () {
//                     clear();
//
//                     if (F.current && F.player.isActive) {
//                         F.player.timer = setTimeout(F.next, F.current.playSpeed);
//                     }
//                 },
//                 stop = function () {
//                     clear();
//
//                     D.unbind('.player');
//
//                     F.player.isActive = false;
//
//                     F.trigger('onPlayEnd');
//                 },
//                 start = function () {
//                     if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
//                         F.player.isActive = true;
//
//                         D.bind({
//                             'onCancel.player beforeClose.player' : stop,
//                             'onUpdate.player'   : set,
//                             'beforeLoad.player' : clear
//                         });
//
//                         set();
//
//                         F.trigger('onPlayStart');
//                     }
//                 };
//
//             if (action === true || (!F.player.isActive && action !== false)) {
//                 start();
//             } else {
//                 stop();
//             }
//         },
//
//         // Navigate to next gallery item
//         next: function ( direction ) {
//             var current = F.current;
//
//             if (current) {
//                 if (!isString(direction)) {
//                     direction = current.direction.next;
//                 }
//
//                 F.jumpto(current.index + 1, direction, 'next');
//             }
//         },
//
//         // Navigate to previous gallery item
//         prev: function ( direction ) {
//             var current = F.current;
//
//             if (current) {
//                 if (!isString(direction)) {
//                     direction = current.direction.prev;
//                 }
//
//                 F.jumpto(current.index - 1, direction, 'prev');
//             }
//         },
//
//         // Navigate to gallery item by index
//         jumpto: function ( index, direction, router ) {
//             var current = F.current;
//
//             if (!current) {
//                 return;
//             }
//
//             index = getScalar(index);
//
//             F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
//             F.router    = router || 'jumpto';
//
//             if (current.loop) {
//                 if (index < 0) {
//                     index = current.group.length + (index % current.group.length);
//                 }
//
//                 index = index % current.group.length;
//             }
//
//             if (current.group[ index ] !== undefined) {
//                 F.cancel();
//
//                 F._start(index);
//             }
//         },
//
//         // Center inside viewport and toggle position type to fixed or absolute if needed
//         reposition: function (e, onlyAbsolute) {
//             var current = F.current,
//                 wrap    = current ? current.wrap : null,
//                 pos;
//
//             if (wrap) {
//                 pos = F._getPosition(onlyAbsolute);
//
//                 if (e && e.type === 'scroll') {
//                     delete pos.position;
//
//                     wrap.stop(true, true).animate(pos, 200);
//
//                 } else {
//                     wrap.css(pos);
//
//                     current.pos = $.extend({}, current.dim, pos);
//                 }
//             }
//         },
//
//         update: function (e) {
//             var type = (e && e.type),
//                 anyway = !type || type === 'orientationchange';
//
//             if (anyway) {
//                 clearTimeout(didUpdate);
//
//                 didUpdate = null;
//             }
//
//             if (!F.isOpen || didUpdate) {
//                 return;
//             }
//
//             didUpdate = setTimeout(function() {
//                 var current = F.current;
//
//                 if (!current || F.isClosing) {
//                     return;
//                 }
//
//                 F.wrap.removeClass('fancybox-tmp');
//
//                 if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
//                     F._setDimension();
//                 }
//
//                 if (!(type === 'scroll' && current.canShrink)) {
//                     F.reposition(e);
//                 }
//
//                 F.trigger('onUpdate');
//
//                 didUpdate = null;
//
//             }, (anyway && !isTouch ? 0 : 300));
//         },
//
//         // Shrink content to fit inside viewport or restore if resized
//         toggle: function ( action ) {
//             if (F.isOpen) {
//                 F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;
//
//                 // Help browser to restore document dimensions
//                 if (isTouch) {
//                     F.wrap.removeAttr('style').addClass('fancybox-tmp');
//
//                     F.trigger('onUpdate');
//                 }
//
//                 F.update();
//             }
//         },
//
//         hideLoading: function () {
//             D.unbind('.loading');
//
//             $('#fancybox-loading').remove();
//         },
//
//         showLoading: function () {
//             var el, viewport;
//
//             F.hideLoading();
//
//             el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');
//
//             // If user will press the escape-button, the request will be canceled
//             D.bind('keydown.loading', function(e) {
//                 if ((e.which || e.keyCode) === 27) {
//                     e.preventDefault();
//
//                     F.cancel();
//                 }
//             });
//
//             if (!F.defaults.fixed) {
//                 viewport = F.getViewport();
//
//                 el.css({
//                     position : 'absolute',
//                     top  : (viewport.h * 0.5) + viewport.y,
//                     left : (viewport.w * 0.5) + viewport.x
//                 });
//             }
//         },
//
//         getViewport: function () {
//             var locked = (F.current && F.current.locked) || false,
//                 rez    = {
//                     x: W.scrollLeft(),
//                     y: W.scrollTop()
//                 };
//
//             if (locked) {
//                 rez.w = locked[0].clientWidth;
//                 rez.h = locked[0].clientHeight;
//
//             } else {
//                 // See http://bugs.jquery.com/ticket/6724
//                 rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
//                 rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
//             }
//
//             return rez;
//         },
//
//         // Unbind the keyboard / clicking actions
//         unbindEvents: function () {
//             if (F.wrap && isQuery(F.wrap)) {
//                 F.wrap.unbind('.fb');
//             }
//
//             D.unbind('.fb');
//             W.unbind('.fb');
//         },
//
//         bindEvents: function () {
//             var current = F.current,
//                 keys;
//
//             if (!current) {
//                 return;
//             }
//
//             // Changing document height on iOS devices triggers a 'resize' event,
//             // that can change document height... repeating infinitely
//             W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);
//
//             keys = current.keys;
//
//             if (keys) {
//                 D.bind('keydown.fb', function (e) {
//                     var code   = e.which || e.keyCode,
//                         target = e.target || e.srcElement;
//
//                     // Skip esc key if loading, because showLoading will cancel preloading
//                     if (code === 27 && F.coming) {
//                         return false;
//                     }
//
//                     // Ignore key combinations and key events within form elements
//                     if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
//                         $.each(keys, function(i, val) {
//                             if (current.group.length > 1 && val[ code ] !== undefined) {
//                                 F[ i ]( val[ code ] );
//
//                                 e.preventDefault();
//                                 return false;
//                             }
//
//                             if ($.inArray(code, val) > -1) {
//                                 F[ i ] ();
//
//                                 e.preventDefault();
//                                 return false;
//                             }
//                         });
//                     }
//                 });
//             }
//
//             if ($.fn.mousewheel && current.mouseWheel) {
//                 F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
//                     var target = e.target || null,
//                         parent = $(target),
//                         canScroll = false;
//
//                     while (parent.length) {
//                         if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
//                             break;
//                         }
//
//                         canScroll = isScrollable( parent[0] );
//                         parent    = $(parent).parent();
//                     }
//
//                     if (delta !== 0 && !canScroll) {
//                         if (F.group.length > 1 && !current.canShrink) {
//                             if (deltaY > 0 || deltaX > 0) {
//                                 F.prev( deltaY > 0 ? 'down' : 'left' );
//
//                             } else if (deltaY < 0 || deltaX < 0) {
//                                 F.next( deltaY < 0 ? 'up' : 'right' );
//                             }
//
//                             e.preventDefault();
//                         }
//                     }
//                 });
//             }
//         },
//
//         trigger: function (event, o) {
//             var ret, obj = o || F.coming || F.current;
//
//             if (!obj) {
//                 return;
//             }
//
//             if ($.isFunction( obj[event] )) {
//                 ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
//             }
//
//             if (ret === false) {
//                 return false;
//             }
//
//             if (obj.helpers) {
//                 $.each(obj.helpers, function (helper, opts) {
//                     if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
//                         F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
//                     }
//                 });
//             }
//
//             D.trigger(event);
//         },
//
//         isImage: function (str) {
//             return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
//         },
//
//         isSWF: function (str) {
//             return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
//         },
//
//         _start: function (index) {
//             var coming = {},
//                 obj,
//                 href,
//                 type,
//                 margin,
//                 padding;
//
//             index = getScalar( index );
//             obj   = F.group[ index ] || null;
//
//             if (!obj) {
//                 return false;
//             }
//
//             coming = $.extend(true, {}, F.opts, obj);
//
//             // Convert margin and padding properties to array - top, right, bottom, left
//             margin  = coming.margin;
//             padding = coming.padding;
//
//             if ($.type(margin) === 'number') {
//                 coming.margin = [margin, margin, margin, margin];
//             }
//
//             if ($.type(padding) === 'number') {
//                 coming.padding = [padding, padding, padding, padding];
//             }
//
//             // 'modal' propery is just a shortcut
//             if (coming.modal) {
//                 $.extend(true, coming, {
//                     closeBtn   : false,
//                     closeClick : false,
//                     nextClick  : false,
//                     arrows     : false,
//                     mouseWheel : false,
//                     keys       : null,
//                     helpers: {
//                         overlay : {
//                             closeClick : false
//                         }
//                     }
//                 });
//             }
//
//             // 'autoSize' property is a shortcut, too
//             if (coming.autoSize) {
//                 coming.autoWidth = coming.autoHeight = true;
//             }
//
//             if (coming.width === 'auto') {
//                 coming.autoWidth = true;
//             }
//
//             if (coming.height === 'auto') {
//                 coming.autoHeight = true;
//             }
//
//             /*
// 			 * Add reference to the group, so it`s possible to access from callbacks, example:
// 			 * afterLoad : function() {
// 			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
// 			 * }
// 			 */
//
//             coming.group  = F.group;
//             coming.index  = index;
//
//             // Give a chance for callback or helpers to update coming item (type, title, etc)
//             F.coming = coming;
//
//             if (false === F.trigger('beforeLoad')) {
//                 F.coming = null;
//
//                 return;
//             }
//
//             type = coming.type;
//             href = coming.href;
//
//             if (!type) {
//                 F.coming = null;
//
//                 //If we can not determine content type then drop silently or display next/prev item if looping through gallery
//                 if (F.current && F.router && F.router !== 'jumpto') {
//                     F.current.index = index;
//
//                     return F[ F.router ]( F.direction );
//                 }
//
//                 return false;
//             }
//
//             F.isActive = true;
//
//             if (type === 'image' || type === 'swf') {
//                 coming.autoHeight = coming.autoWidth = false;
//                 coming.scrolling  = 'visible';
//             }
//
//             if (type === 'image') {
//                 coming.aspectRatio = true;
//             }
//
//             if (type === 'iframe' && isTouch) {
//                 coming.scrolling = 'scroll';
//             }
//
//             // Build the neccessary markup
//             coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );
//
//             $.extend(coming, {
//                 skin  : $('.fancybox-skin',  coming.wrap),
//                 outer : $('.fancybox-outer', coming.wrap),
//                 inner : $('.fancybox-inner', coming.wrap)
//             });
//
//             $.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
//                 coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
//             });
//
//             F.trigger('onReady');
//
//             // Check before try to load; 'inline' and 'html' types need content, others - href
//             if (type === 'inline' || type === 'html') {
//                 if (!coming.content || !coming.content.length) {
//                     return F._error( 'content' );
//                 }
//
//             } else if (!href) {
//                 return F._error( 'href' );
//             }
//
//             if (type === 'image') {
//                 F._loadImage();
//
//             } else if (type === 'ajax') {
//                 F._loadAjax();
//
//             } else if (type === 'iframe') {
//                 F._loadIframe();
//
//             } else {
//                 F._afterLoad();
//             }
//         },
//
//         _error: function ( type ) {
//             $.extend(F.coming, {
//                 type       : 'html',
//                 autoWidth  : true,
//                 autoHeight : true,
//                 minWidth   : 0,
//                 minHeight  : 0,
//                 scrolling  : 'no',
//                 hasError   : type,
//                 content    : F.coming.tpl.error
//             });
//
//             F._afterLoad();
//         },
//
//         _loadImage: function () {
//             // Reset preload image so it is later possible to check "complete" property
//             var img = F.imgPreload = new Image();
//
//             img.onload = function () {
//                 this.onload = this.onerror = null;
//
//                 F.coming.width  = this.width / F.opts.pixelRatio;
//                 F.coming.height = this.height / F.opts.pixelRatio;
//
//                 F._afterLoad();
//             };
//
//             img.onerror = function () {
//                 this.onload = this.onerror = null;
//
//                 F._error( 'image' );
//             };
//
//             img.src = F.coming.href;
//
//             if (img.complete !== true) {
//                 F.showLoading();
//             }
//         },
//
//         _loadAjax: function () {
//             var coming = F.coming;
//
//             F.showLoading();
//
//             F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
//                 url: coming.href,
//                 error: function (jqXHR, textStatus) {
//                     if (F.coming && textStatus !== 'abort') {
//                         F._error( 'ajax', jqXHR );
//
//                     } else {
//                         F.hideLoading();
//                     }
//                 },
//                 success: function (data, textStatus) {
//                     if (textStatus === 'success') {
//                         coming.content = data;
//
//                         F._afterLoad();
//                     }
//                 }
//             }));
//         },
//
//         _loadIframe: function() {
//             var coming = F.coming,
//                 iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
//                     .attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
//                     .attr('src', coming.href);
//
//             // This helps IE
//             $(coming.wrap).bind('onReset', function () {
//                 try {
//                     $(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
//                 } catch (e) {}
//             });
//
//             if (coming.iframe.preload) {
//                 F.showLoading();
//
//                 iframe.one('load', function() {
//                     $(this).data('ready', 1);
//
//                     // iOS will lose scrolling if we resize
//                     if (!isTouch) {
//                         $(this).bind('load.fb', F.update);
//                     }
//
//                     // Without this trick:
//                     //   - iframe won't scroll on iOS devices
//                     //   - IE7 sometimes displays empty iframe
//                     $(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();
//
//                     F._afterLoad();
//                 });
//             }
//
//             coming.content = iframe.appendTo( coming.inner );
//
//             if (!coming.iframe.preload) {
//                 F._afterLoad();
//             }
//         },
//
//         _preloadImages: function() {
//             var group   = F.group,
//                 current = F.current,
//                 len     = group.length,
//                 cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
//                 item,
//                 i;
//
//             for (i = 1; i <= cnt; i += 1) {
//                 item = group[ (current.index + i ) % len ];
//
//                 if (item.type === 'image' && item.href) {
//                     new Image().src = item.href;
//                 }
//             }
//         },
//
//         _afterLoad: function () {
//             var coming   = F.coming,
//                 previous = F.current,
//                 placeholder = 'fancybox-placeholder',
//                 current,
//                 content,
//                 type,
//                 scrolling,
//                 href,
//                 embed;
//
//             F.hideLoading();
//
//             if (!coming || F.isActive === false) {
//                 return;
//             }
//
//             if (false === F.trigger('afterLoad', coming, previous)) {
//                 coming.wrap.stop(true).trigger('onReset').remove();
//
//                 F.coming = null;
//
//                 return;
//             }
//
//             if (previous) {
//                 F.trigger('beforeChange', previous);
//
//                 previous.wrap.stop(true).removeClass('fancybox-opened')
//                     .find('.fancybox-item, .fancybox-nav')
//                     .remove();
//             }
//
//             F.unbindEvents();
//
//             current   = coming;
//             content   = coming.content;
//             type      = coming.type;
//             scrolling = coming.scrolling;
//
//             $.extend(F, {
//                 wrap  : current.wrap,
//                 skin  : current.skin,
//                 outer : current.outer,
//                 inner : current.inner,
//                 current  : current,
//                 previous : previous
//             });
//
//             href = current.href;
//
//             switch (type) {
//                 case 'inline':
//                 case 'ajax':
//                 case 'html':
//                     if (current.selector) {
//                         content = $('<div>').html(content).find(current.selector);
//
//                     } else if (isQuery(content)) {
//                         if (!content.data(placeholder)) {
//                             content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
//                         }
//
//                         content = content.show().detach();
//
//                         current.wrap.bind('onReset', function () {
//                             if ($(this).find(content).length) {
//                                 content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
//                             }
//                         });
//                     }
//                     break;
//
//                 case 'image':
//                     content = current.tpl.image.replace('{href}', href);
//                     break;
//
//                 case 'swf':
//                     content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
//                     embed   = '';
//
//                     $.each(current.swf, function(name, val) {
//                         content += '<param name="' + name + '" value="' + val + '"></param>';
//                         embed   += ' ' + name + '="' + val + '"';
//                     });
//
//                     content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
//                     break;
//             }
//
//             if (!(isQuery(content) && content.parent().is(current.inner))) {
//                 current.inner.append( content );
//             }
//
//             // Give a chance for helpers or callbacks to update elements
//             F.trigger('beforeShow');
//
//             // Set scrolling before calculating dimensions
//             current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));
//
//             // Set initial dimensions and start position
//             F._setDimension();
//
//             F.reposition();
//
//             F.isOpen = false;
//             F.coming = null;
//
//             F.bindEvents();
//
//             if (!F.isOpened) {
//                 $('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();
//
//             } else if (previous.prevMethod) {
//                 F.transitions[ previous.prevMethod ]();
//             }
//
//             F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();
//
//             F._preloadImages();
//         },
//
//         _setDimension: function () {
//             var viewport   = F.getViewport(),
//                 steps      = 0,
//                 canShrink  = false,
//                 canExpand  = false,
//                 wrap       = F.wrap,
//                 skin       = F.skin,
//                 inner      = F.inner,
//                 current    = F.current,
//                 width      = current.width,
//                 height     = current.height,
//                 minWidth   = current.minWidth,
//                 minHeight  = current.minHeight,
//                 maxWidth   = current.maxWidth,
//                 maxHeight  = current.maxHeight,
//                 scrolling  = current.scrolling,
//                 scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
//                 margin     = current.margin,
//                 wMargin    = getScalar(margin[1] + margin[3]),
//                 hMargin    = getScalar(margin[0] + margin[2]),
//                 wPadding,
//                 hPadding,
//                 wSpace,
//                 hSpace,
//                 origWidth,
//                 origHeight,
//                 origMaxWidth,
//                 origMaxHeight,
//                 ratio,
//                 width_,
//                 height_,
//                 maxWidth_,
//                 maxHeight_,
//                 iframe,
//                 body;
//
//             // Reset dimensions so we could re-check actual size
//             wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');
//
//             wPadding = getScalar(skin.outerWidth(true)  - skin.width());
//             hPadding = getScalar(skin.outerHeight(true) - skin.height());
//
//             // Any space between content and viewport (margin, padding, border, title)
//             wSpace = wMargin + wPadding;
//             hSpace = hMargin + hPadding;
//
//             origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
//             origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;
//
//             if (current.type === 'iframe') {
//                 iframe = current.content;
//
//                 if (current.autoHeight && iframe.data('ready') === 1) {
//                     try {
//                         if (iframe[0].contentWindow.document.location) {
//                             inner.width( origWidth ).height(9999);
//
//                             body = iframe.contents().find('body');
//
//                             if (scrollOut) {
//                                 body.css('overflow-x', 'hidden');
//                             }
//
//                             origHeight = body.outerHeight(true);
//                         }
//
//                     } catch (e) {}
//                 }
//
//             } else if (current.autoWidth || current.autoHeight) {
//                 inner.addClass( 'fancybox-tmp' );
//
//                 // Set width or height in case we need to calculate only one dimension
//                 if (!current.autoWidth) {
//                     inner.width( origWidth );
//                 }
//
//                 if (!current.autoHeight) {
//                     inner.height( origHeight );
//                 }
//
//                 if (current.autoWidth) {
//                     origWidth = inner.width();
//                 }
//
//                 if (current.autoHeight) {
//                     origHeight = inner.height();
//                 }
//
//                 inner.removeClass( 'fancybox-tmp' );
//             }
//
//             width  = getScalar( origWidth );
//             height = getScalar( origHeight );
//
//             ratio  = origWidth / origHeight;
//
//             // Calculations for the content
//             minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
//             maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);
//
//             minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
//             maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);
//
//             // These will be used to determine if wrap can fit in the viewport
//             origMaxWidth  = maxWidth;
//             origMaxHeight = maxHeight;
//
//             if (current.fitToView) {
//                 maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
//                 maxHeight = Math.min(viewport.h - hSpace, maxHeight);
//             }
//
//             maxWidth_  = viewport.w - wMargin;
//             maxHeight_ = viewport.h - hMargin;
//
//             if (current.aspectRatio) {
//                 if (width > maxWidth) {
//                     width  = maxWidth;
//                     height = getScalar(width / ratio);
//                 }
//
//                 if (height > maxHeight) {
//                     height = maxHeight;
//                     width  = getScalar(height * ratio);
//                 }
//
//                 if (width < minWidth) {
//                     width  = minWidth;
//                     height = getScalar(width / ratio);
//                 }
//
//                 if (height < minHeight) {
//                     height = minHeight;
//                     width  = getScalar(height * ratio);
//                 }
//
//             } else {
//                 width = Math.max(minWidth, Math.min(width, maxWidth));
//
//                 if (current.autoHeight && current.type !== 'iframe') {
//                     inner.width( width );
//
//                     height = inner.height();
//                 }
//
//                 height = Math.max(minHeight, Math.min(height, maxHeight));
//             }
//
//             // Try to fit inside viewport (including the title)
//             if (current.fitToView) {
//                 inner.width( width ).height( height );
//
//                 wrap.width( width + wPadding );
//
//                 // Real wrap dimensions
//                 width_  = wrap.width();
//                 height_ = wrap.height();
//
//                 if (current.aspectRatio) {
//                     while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
//                         if (steps++ > 19) {
//                             break;
//                         }
//
//                         height = Math.max(minHeight, Math.min(maxHeight, height - 10));
//                         width  = getScalar(height * ratio);
//
//                         if (width < minWidth) {
//                             width  = minWidth;
//                             height = getScalar(width / ratio);
//                         }
//
//                         if (width > maxWidth) {
//                             width  = maxWidth;
//                             height = getScalar(width / ratio);
//                         }
//
//                         inner.width( width ).height( height );
//
//                         wrap.width( width + wPadding );
//
//                         width_  = wrap.width();
//                         height_ = wrap.height();
//                     }
//
//                 } else {
//                     width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
//                     height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
//                 }
//             }
//
//             if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
//                 width += scrollOut;
//             }
//
//             inner.width( width ).height( height );
//
//             wrap.width( width + wPadding );
//
//             width_  = wrap.width();
//             height_ = wrap.height();
//
//             canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
//             canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));
//
//             $.extend(current, {
//                 dim : {
//                     width	: getValue( width_ ),
//                     height	: getValue( height_ )
//                 },
//                 origWidth  : origWidth,
//                 origHeight : origHeight,
//                 canShrink  : canShrink,
//                 canExpand  : canExpand,
//                 wPadding   : wPadding,
//                 hPadding   : hPadding,
//                 wrapSpace  : height_ - skin.outerHeight(true),
//                 skinSpace  : skin.height() - height
//             });
//
//             if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
//                 inner.height('auto');
//             }
//         },
//
//         _getPosition: function (onlyAbsolute) {
//             var current  = F.current,
//                 viewport = F.getViewport(),
//                 margin   = current.margin,
//                 width    = F.wrap.width()  + margin[1] + margin[3],
//                 height   = F.wrap.height() + margin[0] + margin[2],
//                 rez      = {
//                     position: 'absolute',
//                     top  : margin[0],
//                     left : margin[3]
//                 };
//
//             if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
//                 rez.position = 'fixed';
//
//             } else if (!current.locked) {
//                 rez.top  += viewport.y;
//                 rez.left += viewport.x;
//             }
//
//             rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
//             rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));
//
//             return rez;
//         },
//
//         _afterZoomIn: function () {
//             var current = F.current;
//
//             if (!current) {
//                 return;
//             }
//
//             F.isOpen = F.isOpened = true;
//
//             F.wrap.css('overflow', 'visible').addClass('fancybox-opened');
//
//             F.update();
//
//             // Assign a click event
//             if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
//                 F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
//                     if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
//                         e.preventDefault();
//
//                         F[ current.closeClick ? 'close' : 'next' ]();
//                     }
//                 });
//             }
//
//             // Create a close button
//             if (current.closeBtn) {
//                 $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
//                     e.preventDefault();
//
//                     F.close();
//                 });
//             }
//
//             // Create navigation arrows
//             if (current.arrows && F.group.length > 1) {
//                 if (current.loop || current.index > 0) {
//                     $(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
//                 }
//
//                 if (current.loop || current.index < F.group.length - 1) {
//                     $(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
//                 }
//             }
//
//             F.trigger('afterShow');
//
//             // Stop the slideshow if this is the last item
//             if (!current.loop && current.index === current.group.length - 1) {
//                 F.play( false );
//
//             } else if (F.opts.autoPlay && !F.player.isActive) {
//                 F.opts.autoPlay = false;
//
//                 F.play();
//             }
//         },
//
//         _afterZoomOut: function ( obj ) {
//             obj = obj || F.current;
//
//             $('.fancybox-wrap').trigger('onReset').remove();
//
//             $.extend(F, {
//                 group  : {},
//                 opts   : {},
//                 router : false,
//                 current   : null,
//                 isActive  : false,
//                 isOpened  : false,
//                 isOpen    : false,
//                 isClosing : false,
//                 wrap   : null,
//                 skin   : null,
//                 outer  : null,
//                 inner  : null
//             });
//
//             F.trigger('afterClose', obj);
//         }
//     });
//
//     /*
// 	 *	Default transitions
// 	 */
//
//     F.transitions = {
//         getOrigPosition: function () {
//             var current  = F.current,
//                 element  = current.element,
//                 orig     = current.orig,
//                 pos      = {},
//                 width    = 50,
//                 height   = 50,
//                 hPadding = current.hPadding,
//                 wPadding = current.wPadding,
//                 viewport = F.getViewport();
//
//             if (!orig && current.isDom && element.is(':visible')) {
//                 orig = element.find('img:first');
//
//                 if (!orig.length) {
//                     orig = element;
//                 }
//             }
//
//             if (isQuery(orig)) {
//                 pos = orig.offset();
//
//                 if (orig.is('img')) {
//                     width  = orig.outerWidth();
//                     height = orig.outerHeight();
//                 }
//
//             } else {
//                 pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
//                 pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
//             }
//
//             if (F.wrap.css('position') === 'fixed' || current.locked) {
//                 pos.top  -= viewport.y;
//                 pos.left -= viewport.x;
//             }
//
//             pos = {
//                 top     : getValue(pos.top  - hPadding * current.topRatio),
//                 left    : getValue(pos.left - wPadding * current.leftRatio),
//                 width   : getValue(width  + wPadding),
//                 height  : getValue(height + hPadding)
//             };
//
//             return pos;
//         },
//
//         step: function (now, fx) {
//             var ratio,
//                 padding,
//                 value,
//                 prop       = fx.prop,
//                 current    = F.current,
//                 wrapSpace  = current.wrapSpace,
//                 skinSpace  = current.skinSpace;
//
//             if (prop === 'width' || prop === 'height') {
//                 ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);
//
//                 if (F.isClosing) {
//                     ratio = 1 - ratio;
//                 }
//
//                 padding = prop === 'width' ? current.wPadding : current.hPadding;
//                 value   = now - padding;
//
//                 F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
//                 F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
//             }
//         },
//
//         zoomIn: function () {
//             var current  = F.current,
//                 startPos = current.pos,
//                 effect   = current.openEffect,
//                 elastic  = effect === 'elastic',
//                 endPos   = $.extend({opacity : 1}, startPos);
//
//             // Remove "position" property that breaks older IE
//             delete endPos.position;
//
//             if (elastic) {
//                 startPos = this.getOrigPosition();
//
//                 if (current.openOpacity) {
//                     startPos.opacity = 0.1;
//                 }
//
//             } else if (effect === 'fade') {
//                 startPos.opacity = 0.1;
//             }
//
//             F.wrap.css(startPos).animate(endPos, {
//                 duration : effect === 'none' ? 0 : current.openSpeed,
//                 easing   : current.openEasing,
//                 step     : elastic ? this.step : null,
//                 complete : F._afterZoomIn
//             });
//         },
//
//         zoomOut: function () {
//             var current  = F.current,
//                 effect   = current.closeEffect,
//                 elastic  = effect === 'elastic',
//                 endPos   = {opacity : 0.1};
//
//             if (elastic) {
//                 endPos = this.getOrigPosition();
//
//                 if (current.closeOpacity) {
//                     endPos.opacity = 0.1;
//                 }
//             }
//
//             F.wrap.animate(endPos, {
//                 duration : effect === 'none' ? 0 : current.closeSpeed,
//                 easing   : current.closeEasing,
//                 step     : elastic ? this.step : null,
//                 complete : F._afterZoomOut
//             });
//         },
//
//         changeIn: function () {
//             var current   = F.current,
//                 effect    = current.nextEffect,
//                 startPos  = current.pos,
//                 endPos    = { opacity : 1 },
//                 direction = F.direction,
//                 distance  = 200,
//                 field;
//
//             startPos.opacity = 0.1;
//
//             if (effect === 'elastic') {
//                 field = direction === 'down' || direction === 'up' ? 'top' : 'left';
//
//                 if (direction === 'down' || direction === 'right') {
//                     startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
//                     endPos[ field ]   = '+=' + distance + 'px';
//
//                 } else {
//                     startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
//                     endPos[ field ]   = '-=' + distance + 'px';
//                 }
//             }
//
//             // Workaround for http://bugs.jquery.com/ticket/12273
//             if (effect === 'none') {
//                 F._afterZoomIn();
//
//             } else {
//                 F.wrap.css(startPos).animate(endPos, {
//                     duration : current.nextSpeed,
//                     easing   : current.nextEasing,
//                     complete : F._afterZoomIn
//                 });
//             }
//         },
//
//         changeOut: function () {
//             var previous  = F.previous,
//                 effect    = previous.prevEffect,
//                 endPos    = { opacity : 0.1 },
//                 direction = F.direction,
//                 distance  = 200;
//
//             if (effect === 'elastic') {
//                 endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
//             }
//
//             previous.wrap.animate(endPos, {
//                 duration : effect === 'none' ? 0 : previous.prevSpeed,
//                 easing   : previous.prevEasing,
//                 complete : function () {
//                     $(this).trigger('onReset').remove();
//                 }
//             });
//         }
//     };
//
//     /*
// 	 *	Overlay helper
// 	 */
//
//     F.helpers.overlay = {
//         defaults : {
//             closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
//             speedOut   : 200,       // duration of fadeOut animation
//             showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
//             css        : {},        // custom CSS properties
//             locked     : !isTouch,  // if true, the content will be locked into overlay
//             fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
//         },
//
//         overlay : null,      // current handle
//         fixed   : false,     // indicates if the overlay has position "fixed"
//         el      : $('html'), // element that contains "the lock"
//
//         // Public methods
//         create : function(opts) {
//             opts = $.extend({}, this.defaults, opts);
//
//             if (this.overlay) {
//                 this.close();
//             }
//
//             this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( F.coming ? F.coming.parent : opts.parent );
//             this.fixed   = false;
//
//             if (opts.fixed && F.defaults.fixed) {
//                 this.overlay.addClass('fancybox-overlay-fixed');
//
//                 this.fixed = true;
//             }
//         },
//
//         open : function(opts) {
//             var that = this;
//
//             opts = $.extend({}, this.defaults, opts);
//
//             if (this.overlay) {
//                 this.overlay.unbind('.overlay').width('auto').height('auto');
//
//             } else {
//                 this.create(opts);
//             }
//
//             if (!this.fixed) {
//                 W.bind('resize.overlay', $.proxy( this.update, this) );
//
//                 this.update();
//             }
//
//             if (opts.closeClick) {
//                 this.overlay.bind('click.overlay', function(e) {
//                     if ($(e.target).hasClass('fancybox-overlay')) {
//                         if (F.isActive) {
//                             F.close();
//                         } else {
//                             that.close();
//                         }
//
//                         return false;
//                     }
//                 });
//             }
//
//             this.overlay.css( opts.css ).show();
//         },
//
//         close : function() {
//             var scrollV, scrollH;
//
//             W.unbind('resize.overlay');
//
//             if (this.el.hasClass('fancybox-lock')) {
//                 $('.fancybox-margin').removeClass('fancybox-margin');
//
//                 scrollV = W.scrollTop();
//                 scrollH = W.scrollLeft();
//
//                 this.el.removeClass('fancybox-lock');
//
//                 W.scrollTop( scrollV ).scrollLeft( scrollH );
//             }
//
//             $('.fancybox-overlay').remove().hide();
//
//             $.extend(this, {
//                 overlay : null,
//                 fixed   : false
//             });
//         },
//
//         // Private, callbacks
//
//         update : function () {
//             var width = '100%', offsetWidth;
//
//             // Reset width/height so it will not mess
//             this.overlay.width(width).height('100%');
//
//             // $J does not return reliable result for IE
//             if (IE) {
//                 offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
//
//                 if (D.width() > offsetWidth) {
//                     width = D.width();
//                 }
//
//             } else if (D.width() > W.width()) {
//                 width = D.width();
//             }
//
//             this.overlay.width(width).height(D.height());
//         },
//
//         // This is where we can manipulate DOM, because later it would cause iframes to reload
//         onReady : function (opts, obj) {
//             var overlay = this.overlay;
//
//             $('.fancybox-overlay').stop(true, true);
//
//             if (!overlay) {
//                 this.create(opts);
//             }
//
//             if (opts.locked && this.fixed && obj.fixed) {
//                 if (!overlay) {
//                     this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
//                 }
//
//                 obj.locked = this.overlay.append( obj.wrap );
//                 obj.fixed  = false;
//             }
//
//             if (opts.showEarly === true) {
//                 this.beforeShow.apply(this, arguments);
//             }
//         },
//
//         beforeShow : function(opts, obj) {
//             var scrollV, scrollH;
//
//             if (obj.locked) {
//                 if (this.margin !== false) {
//                     $('*').filter(function(){
//                         return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
//                     }).addClass('fancybox-margin');
//
//                     this.el.addClass('fancybox-margin');
//                 }
//
//                 scrollV = W.scrollTop();
//                 scrollH = W.scrollLeft();
//
//                 this.el.addClass('fancybox-lock');
//
//                 W.scrollTop( scrollV ).scrollLeft( scrollH );
//             }
//
//             this.open(opts);
//         },
//
//         onUpdate : function() {
//             if (!this.fixed) {
//                 this.update();
//             }
//         },
//
//         afterClose: function (opts) {
//             // Remove overlay if exists and fancyBox is not opening
//             // (e.g., it is not being open using afterClose callback)
//             //if (this.overlay && !F.isActive) {
//             if (this.overlay && !F.coming) {
//                 this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
//             }
//         }
//     };
//
//     /*
// 	 *	Title helper
// 	 */
//
//     F.helpers.title = {
//         defaults : {
//             type     : 'float', // 'float', 'inside', 'outside' or 'over',
//             position : 'bottom' // 'top' or 'bottom'
//         },
//
//         beforeShow: function (opts) {
//             var current = F.current,
//                 text    = current.title,
//                 type    = opts.type,
//                 title,
//                 target;
//
//             if ($.isFunction(text)) {
//                 text = text.call(current.element, current);
//             }
//
//             if (!isString(text) || $.trim(text) === '') {
//                 return;
//             }
//
//             title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');
//
//             switch (type) {
//                 case 'inside':
//                     target = F.skin;
//                     break;
//
//                 case 'outside':
//                     target = F.wrap;
//                     break;
//
//                 case 'over':
//                     target = F.inner;
//                     break;
//
//                 default: // 'float'
//                     target = F.skin;
//
//                     title.appendTo('body');
//
//                     if (IE) {
//                         title.width( title.width() );
//                     }
//
//                     title.wrapInner('<span class="child"></span>');
//
//                     //Increase bottom margin so this title will also fit into viewport
//                     F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
//                     break;
//             }
//
//             title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
//         }
//     };
//
//     // $J plugin initialization
//     $.fn.fancybox = function (options) {
//         var index,
//             that     = $(this),
//             selector = this.selector || '',
//             run      = function(e) {
//                 var what = $(this).blur(), idx = index, relType, relVal;
//
//                 if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
//                     relType = options.groupAttr || 'data-fancybox-group';
//                     relVal  = what.attr(relType);
//
//                     if (!relVal) {
//                         relType = 'rel';
//                         relVal  = what.get(0)[ relType ];
//                     }
//
//                     if (relVal && relVal !== '' && relVal !== 'nofollow') {
//                         what = selector.length ? $(selector) : that;
//                         what = what.filter('[' + relType + '="' + relVal + '"]');
//                         idx  = what.index(this);
//                     }
//
//                     options.index = idx;
//
//                     // Stop an event from bubbling if everything is fine
//                     if (F.open(what, options) !== false) {
//                         e.preventDefault();
//                     }
//                 }
//             };
//
//         options = options || {};
//         index   = options.index || 0;
//
//         if (!selector || options.live === false) {
//             that.unbind('click.fb-start').bind('click.fb-start', run);
//
//         } else {
//             D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
//         }
//
//         this.filter('[data-fancybox-start=1]').trigger('click');
//
//         return this;
//     };
//
//     // Tests that need a body at doc ready
//     D.ready(function() {
//         var w1, w2;
//
//         if ( $.scrollbarWidth === undefined ) {
//             // http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
//             $.scrollbarWidth = function() {
//                 var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
//                     child  = parent.children(),
//                     width  = child.innerWidth() - child.height( 99 ).innerWidth();
//
//                 parent.remove();
//
//                 return width;
//             };
//         }
//
//         if ( $.support.fixedPosition === undefined ) {
//             $.support.fixedPosition = (function() {
//                 var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
//                     fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );
//
//                 elem.remove();
//
//                 return fixed;
//             }());
//         }
//
//         $.extend(F.defaults, {
//             scrollbarWidth : $.scrollbarWidth(),
//             fixed  : $.support.fixedPosition,
//             parent : $('body')
//         });
//
//         //Get real width of page scroll-bar
//         w1 = $(window).width();
//
//         H.addClass('fancybox-lock-test');
//
//         w2 = $(window).width();
//
//         H.removeClass('fancybox-lock-test');
//
//         $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
//     });
//
// }(window, document, $J));
// /*
// 웹디자인 _ 디자인문 _ http://designmoon.net
//
// 본 문서의 소스와 정보에 대한 모든 권리는 디자인문에게 있습니다.
// 사전 동의없이는 어떠한 형식과 방법으로든 무단 도용을 금합니다.
// 만일 위와 같은 권고에도 불구하고 무단 도용시 저작권법에 의거하여 법적인 제재를 받으실 수 있습니다.
// Copyright(c) 2015 designmoon All rights reserved.
// */
//
// function getParamByName(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
//     var results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// };
//
// function getParamBySeo(separator, count, url) {
//     if (!url) url = window.location.pathname;
//     var urls = url.split('/');
//     if (urls[1]==separator) {
//         return urls[count] ? urls[count] : null;
//     } else return null;
// };
//
// function now() {
//     var date = new Date();
//     var m = date.getMonth()+1;
//     var d = date.getDate();
//     var h = date.getHours();
//     var i = date.getMinutes();
//     var s = date.getSeconds();
//     return date.getFullYear()+'-'+(m>9?m:'0'+m)+'-'+(d>9?d:'0'+d)+' '+(h>9?h:'0'+h)+':'+(i>9?i:'0'+i)+':'+(s>9?s:'0'+s);
// };
//
// function stringToDate(datetime)  {
//     datetime = datetime.split(/[-: ]/);
//     return new Date(datetime[0], datetime[1]-1, datetime[2], datetime[3], datetime[4], datetime[5]);
// };
//
// String.prototype.cutByte = function(length, more) {
//     if (typeof(more)=='undefined') more = '...';
//     var str = this;
//     var tmp = 0;
//     for (var i=0; i < str.length; i++) {
//         tmp += (str.charCodeAt(i) > 128) ? 2 : 1;
//         if (tmp > length) return str.substring(0, i) + more;
//     }
//     return str + more;
// }
// String.prototype.removeHTML = function() {
//     var text = this;
//     var objReg = new RegExp();
//     objReg = /[<][^>]*[>]/gi;
//     text = text.replace(objReg, "");
//     return text;
// }
// if (!String.prototype.trim) {
//     String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,''); };
// }
//
//
// // 카페24 쇼핑몰 초기 설정 (PC)
// var category_no = getParamByName('cate_no')!=null ? getParamByName('cate_no') : getParamBySeo('category', 3);
// if (category_no == null) category_no = getParamBySeo('product', 5);
// if (category_no) 	category_no = Number(category_no);
// var product_no = getParamByName('product_no')!=null ? getParamByName('product_no') : getParamBySeo('product', 3);
// if (product_no) 	product_no = Number(product_no);
// var board_no = getParamByName('board_no')!=null ? getParamByName('board_no') : getParamBySeo('board', 3);
// if (!board_no) board_no = getParamBySeo('article', 3);
// if (board_no) 	board_no = Number(board_no);
// var pathname = document.location.pathname;
//
//
//
// // 카테고리 서브카테고리 설정
// var dmoon_category_info = {};
// var dmoon_category_speed = 200;
// $J(document).ready(function($) {
//     // if ($('[ajax_category]').length) {
//     //     $.ajax({
//     //         url: '/exec/front/Product/SubCategory',
//     //         dataType: 'json',
//     //         success: function(data) {
//     //             dmoon_category_info = data;
//     //             if (data == null || data == 'undefined') {
//     //                 return;
//     //             }
//     //
//     //             $('[ajax_category]').each(function() {
//     //                 var This = this;
//     //                 var info_target = $(this).data('category_info_target');
//     //                 $.each(data, function(i, key) {
//     //                     var $parent_obj = $(This).parent().find('[data-cate_no="' + key.parent_cate_no + '"]');
//     //                     if ($parent_obj.length) {
//     //                         if ($parent_obj.attr('href')) $parent_obj = $parent_obj.parent();
//     //                         var depth = ($parent_obj.data('depth') || 1) + 1;
//     //                         if (!$parent_obj.find('>.sub-category').length) {
//     //                             $parent_obj.append('<div class="sub-category" style="display:none;"><ul></ul></div>');
//     //                         }
//     //                         $parent_obj.addClass('arrow');
//     //                         var $child_obj = $parent_obj.find('>.sub-category > ul');
//     //                         $child_obj.append('<li class="depth' + depth + '" data-depth="' + depth + '"><a href="' + key.link_product_list + '" data-cate_no="' + key.cate_no + '">' + key.name + '</a></li>');
//     //                     }
//     //                 });
//     //
//     //                 if (info_target) {
//     //                     $(info_target).find('>ul>li').each(function() {
//     //                         var index = $(this).index();
//     //                         var html = '';
//     //                         if ($(this).data('type') == 'iframe') {
//     //                             html += '<iframe src="' + $(this).data('src') + '" frameborder="0" scrolling="0"></iframe>';
//     //                         } else if ($(this).data('type') == 'movie') {
//     //                             html += '<div class="movie"></div>';
//     //                         } else {
//     //                             html += $(this).html();
//     //                         }
//     //
//     //                         if (html.trim()) {
//     //                             var $obj = $(This).find('>li').eq(index).find('>.sub-category');
//     //                             $obj.append('<div class="sub-category-info">' + html + '</div>');
//     //                             $obj.addClass('sub-ext-category');
//     //
//     //                             if ($(this).data('width')) {
//     //                                 $obj.find('.sub-category-info').children().css('width', $(this).data('width'));
//     //                             }
//     //                             if ($(this).data('height')) {
//     //                                 $obj.find('.sub-category-info').children().css('height', $(this).data('height'));
//     //                             }
//     //
//     //                             if ($(this).data('type') == 'movie' && $(this).data('video-id')) {
//     //                                 /*
// 	// 								$obj.find('.sub-category-info > div').YTPlayer({
// 	// 									fitToBackground: false,
// 	// 									videoId: $(this).data('video-id')
// 	// 								});
// 	// 								*/
//     //
//     //                                 if ($(this).data('video-id') && !$obj.find('.sub-category-info > div').find('.movie_player').length) {
//     //                                     var property = {};
//     //                                     property.videoURL = 'http://youtu.be/' + $(this).data('video-id');
//     //                                     property.containment = 'self';
//     //                                     property.autoPlay = false;
//     //                                     property.mute = true;
//     //                                     property.startAt = 0;
//     //                                     property.opacity = 1;
//     //                                     property.showControls = false;
//     //                                     property.showYTLogo = false;
//     //                                     property.stopMovieOnBlur = false;
//     //                                     $obj.find('.sub-category-info > div').append('<div class="movie_player" data-property="' + JSON.stringify(property).split('"').join("'") + '" />');
//     //                                     //<div class="movie_player" data-property="{videoURL:'http://youtu.be/CDH_dQtvy28',containment:'self',autoPlay:true, mute:true, startAt:0, opacity:1, showControls:false, showYTLogo:false}"></div>
//     //                                     $obj.find('.movie_player').YTPlayer();
//     //                                 }
//     //                             }
//     //
//     //                         }
//     //                     });
//     //                 }
//     //             });
//     //
//     //             for (var i in [1,2,3,4,5]) {
//     //                 $('[category_slide_hover' + i + '] .depth' + i).hover(
//     //                     function() {
//     //                         $('>.sub-category', this).stop(true, true).slideDown(dmoon_category_speed || 200);
//     //                         $(this).addClass('on').addClass('selected');
//     //                     },
//     //                     function() {
//     //                         $('>.sub-category', this).stop(true, true).slideUp(dmoon_category_speed || 200);
//     //                         $(this).removeClass('on').removeClass('selected');
//     //                     }
//     //                 );
//     //                 $('[category_fade_hover' + i + '] .depth' + i).hover(
//     //                     function() {
//     //                         $('>.sub-category', this).stop(true, true).fadeIn(dmoon_category_speed || 200);
//     //                         $(this).addClass('on').addClass('selected');
//     //                     },
//     //                     function() {
//     //                         $('>.sub-category', this).stop(true, true).fadeOut(dmoon_category_speed || 200);
//     //                         $(this).removeClass('on').removeClass('selected');
//     //                     }
//     //                 );
//     //             }
//     //
//     //             $('[ajax_category]').mouseenter(function() {
//     //                 if ($('.movie_player', this).length) $('.movie_player', this).YTPPlay();
//     //             });
//     //
//     //         }
//     //     });
//     // }
//
// });
//
//
// // 기본 설정
// $J(document).ready(function() {
//
//     $J('body').addClass('lang_' + $J('html').attr('lang'));
//
//
//     // html 태그 삭제
//     if ($J('.cuttext').length) {
//         $J('.cuttext').each(function() {
//             var text = $J(this).text().removeHTML();
//             var length = $J(this).next().attr('length');
//             text = text.cutByte(length).trim();
//             $J(this).next().html(text);
//         });
//     }
//
//
//     // 페이지마다 관리자 전용 모듈 클래스가 있을 경우에는 링크 분기 처리
//     if ($J('.is_dmoon_admin_module').length) {
//         $J('.dmoon_admin_link').click(function() {
//             var href = $J(this).attr('data-href');
//             $J(this).attr('href', href);
//             document.location.href = href;
//             return false;
//         });
//     }
//
//
//     // titleArea 추가 클래스 지정
//     $J('#contents .titleArea:first').addClass('titleArea').addClass('firstTitleArea');
//     $J('#contents .path:first').addClass('path');
//
//     if (!$J('#contents .titleArea:first').length) {
//         $J('#contents .title:first h2').wrap('<div class="titleArea firstTitleArea" />')
//         $J('#contents .path').after($J('#contents .titleArea'));
//     }
//     $J('.titleArea').removeClass('init');
//
//     $J('.header_lnb_area').removeClass('init');
//
//
//     // 배너관리 이미지 속성 제거 및 bxslider 컨트롤 a 태그 무시 처리
//     if ($J('.xans-bannermanage2-display').length) {
//         $J('.xans-bannermanage2-display').find('img').each(function() {
//             // $J(this).attr('alt', '');
//             // $J(this).attr('title', '');
//             $J(this).removeAttr('alt');
//             $J(this).removeAttr('title');
//         });
//
//         $J('.xans-bannermanage2 a').on('click', function() {
//             if (!$J(this).find('.banner_image').length) {
//                 if (!$J(this).hasClass('unbind')) {
//                     $(this).unbind('click');
//                     $J(this).addClass('unbind');
//                 }
//             }
//             if ($J(this).hasClass('bx-prev') || $J(this).hasClass('bx-next') || $J(this).hasClass('bx-pager-link')) {
//                 if (!$J(this).hasClass('unbind')) {
//                     $(this).unbind('click');
//                     $J(this).addClass('unbind');
//                 }
//             }
//         });
//     }
//
//
//     // 상품검색시 인기검색어 처리
//     if ($J('#searchForm .xans-search-hotkeyword').length) {
//         var text = $J('#searchForm .xans-search-hotkeyword a:eq(0)').text();
//         if (!text) $J('#searchForm .xans-search-hotkeyword').hide();
//     }
//
//
//     // 로그인시 보안접속 아이콘 변경
//     if ($J('.login .security').length) {
//         $J('.login .security img').attr('src', '/dmoon/imgs/ico_access.gif');
//     }
//
//
//     // 상품목록화면 서브카테고리 아이콘 변경
//     if ($J('.xans-product-displaycategory').length) {
//
//         var sub_arrow_img = '/dmoon/imgs/product_list_sub_category_arrow.png';
//
//         $J('.xans-product-displaycategory .button img').attr('src', sub_arrow_img);
//     }
//
//     // 상품상세화면 추가구성상품 토글 아이콘 변경
//     if ($J('.xans-product-addproduct').length) {
//
//         var close_img = '/dmoon/imgs/btn_recommend_close.gif';
//         var open_img = '/dmoon/imgs/btn_recommend_open.gif';
//
//         $J('.xans-product-addproduct .toggle img').attr('src', close_img);
//     }
//
//
//     // 브랜드 검색
//     if ($J('[brand_search]').length) {
//         $J('[brand_search]').find('a.search').on('click', function() {
//             var name = $J(this).data('name');
//             $J('[brand_search]').find('a.search').removeClass('selected');
//             $J(this).addClass('selected');
//             $J('[brand_search]').find('.brand_list .search').hide();
//             $J('[brand_search]').find('.brand_list .' + name).show();
//             return false;
//         });
//
//         $J('[brand_search]').find('a.search_all').on('click', function() {
//             $J('[brand_search]').find('a.search').removeClass('selected');
//             $J('[brand_search]').find('.brand_list .search').show();
//             return false;
//         });
//     }
//
//
//     // ajax 페이지 호출
//     if ($J('[ajax_data]').length) {
//         $J('[ajax_data]').on('click', function() {
//             var This = $J(this).parent();
//             var ajax_name = $J(this).data('name');
//             var ajax_url = $J(this).data('url');
//             var ajax_width = parseInt($J(this).data('width'));
//             var ajax_height = parseInt($J(this).data('height'));
//             var ajax_animate = $J(this).data('animate');
//             var ajax_animate_value = $J(this).data('animate-value');
//             var ajax_animate_opt = {};
//             if (ajax_animate == 'left') ajax_animate_opt.left = ajax_animate_value;
//             else if (ajax_animate == 'right') ajax_animate_opt.right = ajax_animate_value;
//             else if (ajax_animate == 'top') ajax_animate_opt.top = ajax_animate_value;
//             else if (ajax_animate == 'bottom') ajax_animate_opt.bottom = ajax_animate_value;
//             ajax_animate_opt.opacity = '1';
//
//             var ajax_layer_checked = false;
//             $J('.ajax_layer').each(function() {
//                 var _ajax_name = $J(this).data('name');
//                 if (ajax_name == _ajax_name) ajax_layer_checked = true;
//                 if ($J(this).parent().hasClass('selected')) {
//                     $J(this).parent().removeClass('selected');
//                     $J(this).parent().find('.ajax_layer').remove();
//                 }
//             });
//
//             if (ajax_layer_checked) return false;
//             if (!ajax_url) return false;
//
//             $J.ajax({
//                 type: 'GET',
//                 url: ajax_url,
//                 dataType: 'html',
//                 success: function(data) {
//                     if (data && $J(data).find('#ajax_data').length) {
//                         var ajax_html = $J(data).find('#ajax_data').html();
//
//                         if (!$(This).find('.ajax_layer').length) {
//                             $J(This).addClass('selected');
//                             $J(This).append('<div class="ajax_layer" data-name="' + ajax_name + '" style="' + (ajax_animate ? 'opacity:0;' : '') + (ajax_width ? 'width:' + ajax_width + 'px;': '') + '">' + ajax_html + '</div>');
//
//                             if (typeof($J.mCustomScrollbar) == 'function') {
//                                 $J(This).find('.ajax_layer .ajax_content').mCustomScrollbar({
//                                     axis: 'y'
//                                 });
//                             }
//
//                             $J(This).find('.ajax_layer').stop(true, true).animate(ajax_animate_opt);
//
//                             $J(This).find('.ajax_layer_close_bt').on('click', function() {
//                                 $J(This).find('.ajax_layer').remove(); $J(This).removeClass('selected');
//                                 $J(This).removeClass('selected');
//                                 return false;
//                             });
//                         }
//                     }
//                 },
//                 complete: function(data) {
//                 },
//                 error: function(xhr, status, error) {
//                 }
//             });
//             return false;
//         });
//     }
//
//
//     // 할인판매가 타임세일
//     if ($J('.product_timer').length) {
//         $J('.product_timer').each(function(i) {
//             var This = this;
//             var text = $J(this).find('.content p:eq(1)').text();
//             var start_datetime = text.split(' ~ ')[0];
//             var end_datetime = text.split(' ~ ')[1];
//             var current_datetime = now();
//
//             if (typeof(start_datetime) != 'undefined' && typeof(end_datetime) != 'undefined') {
//                 start_datetime += ':00';
//                 end_datetime += ':00';
//                 current_datetime = Number(((current_datetime.split('-').join('')).split(' ').join('')).split(':').join(''));
//                 var _start_datetime = Number(((start_datetime.split('-').join('')).split(' ').join('')).split(':').join(''));
//                 var _end_datetime = Number(((end_datetime.split('-').join('')).split(' ').join('')).split(':').join(''));
//
//                 $J(this).html('');
//
//                 if (_start_datetime>current_datetime) {
//                     $J(this).addClass('ready');
//
//                 } else if (current_datetime>_end_datetime) {
//                     $J(this).addClass('end');
//
//                 } else if (_start_datetime<current_datetime && current_datetime<=_end_datetime) {
//                     $J(this).data('start_datetime', start_datetime);
//                     $J(this).data('end_datetime', end_datetime);
//                     $J(this).countdown({until: stringToDate(end_datetime), format: ($J(This).data('format') ? $J(This).data('format') : 'DHMS'), compact: $J(This).data('compact')==true ? true : false, padZeroes: true, onExpiry: function() { $J(This).html('').addClass('end'); } });
//
//                 }
//
//                 $J(this).show();
//
//             } else if (text == '') {
//                 $J(this).addClass('end').html('').show();
//
//             }
//
//         });
//     }
//
//
//     // 상품 판매가 할인율
//     if ($J('[product_dc]').length) {
//         $J('[product_dc]').not('.checked').each(function() {
//             var custom_price = $J(this).data('custom-price') || 0;
//             if (custom_price) custom_price = Number(String(custom_price).match(/[-]{0,1}[\d.]*[\d]+/g).join([]));
//             var price = $J(this).data('price') || 0;
//             if (price) {
//                 var _price = String(price).match(/[-]{0,1}[\d.]*[\d]+/g);
//                 if (_price) price = Number(_price.join([]));
//             }
//             var price_sale = $J(this).data('price-sale') || 0;
//             if (price_sale) price_sale = Number(String(price_sale).match(/[-]{0,1}[\d.]*[\d]+/g).join([]));
//             if (price == price_sale) price_sale = 0;
//
//             var target = '';
//
//             // 소비자가가 없고 판매가와 할인판매가가 있을 경우
//             if (custom_price && price && !price_sale) {
//                 target = $J(this).data('target');
//             } else if (!custom_price && price && price_sale) {
//                 target = $J(this).data('target');
//                 custom_price = price;
//                 price = price_sale;
//             }
//
//             // 할인판매가가 있을 경우 판매가로 처리
//             if (price_sale) {
//                 target = $J(this).data('target2');
//                 price = price_sale;
//             }
//
//             var product_dc = 0;
//             if (custom_price && price) product_dc = Math.round(((custom_price-price)*100/custom_price));
//
//             if (target) $J(target).after(this);
//
//             if (product_dc) {
//                 $J(this).prepend(product_dc).addClass('checked').show();
//             } else {
//                 $J(this).hide();
//             }
//
//         });
//     }
//
//
//     // 페이징 css 처리
//     var $paging = $J('div').filter(function() { if ($J(this).attr('class')) return $J(this).attr('class').match(/xans.*paging/); });
//     if ($paging.length) {
//
//         var page_first_img = '/dmoon/imgs/button/btn_page_first.png';
//         var page_prev_img = '/dmoon/imgs/button/btn_page_prev.png';
//         var page_next_img = '/dmoon/imgs/button/btn_page_next.png';
//         var page_last_img = '/dmoon/imgs/button/btn_page_last.png';
//
//         $paging.each(function() {
//             if (!$J(this).hasClass('no_custom_paging')) {
//                 $J(this).addClass('custom_paging').css('display', 'none');
//
//                 var $obj = $J(this).find('>a');
//                 if ($J(this).find('>p').length) $obj = $J(this).find('>p');
//
//                 if ($obj.length == 2) {
//                     $obj.eq(0).addClass('prev').find('img').attr('src', page_prev_img);
//                     $obj.eq(1).addClass('next').find('img').attr('src', page_next_img);
//                 } else {
//                     $obj.eq(0).addClass('first').find('img').attr('src', page_first_img);
//                     $obj.eq(1).addClass('prev').find('img').attr('src', page_prev_img);
//                     $obj.eq(2).addClass('next').find('img').attr('src', page_next_img);
//                     $obj.eq(3).addClass('last').find('img').attr('src', page_last_img);
//                 }
//
//             }
//             $J(this).css('display', 'block');
//         });
//     }
//
//
// });
