//$(function(){
$(document).ready(function(){
    $('.img-thumb-box>img').click(function(){
       const src = $(this).attr('src');
       $('.img-box>img').attr('src', src);
    });
    $('.colors input[type=radio]').click(function(){
      const color  = $(this).val();
      $('.selected').text(color+'색');
    });

    //상품가격 계산
    const prcode = $("#prcode").val();
    const prprice = Number($("#prprice").val());
    const reserves = parseInt($("#reserves").val());  
    const delivery = parseInt($("#delivery").val());
    const prtitle = $('#title').val();
    let totalmoney = prprice;
    let opt1, colortxt, color, opt2, size, sizetxt, optionText;
    
    $('input[name="color"]').change(function(){
        opt1 = Number($(this).data('color')); //추가금액
        colortxt = $(this).data('colorname'); // 컬러값
        color = $(this).val(); // 컬러한글값
        if(opt1 > 0) {
            opt1 = "(+" + opt1.toLocaleString() + "원)";
        }else{
            opt1 = "";
        }
        colortxt += " " + opt1;
    });

    

    let opthtml = `
    <ul class="add-opt">
        <li class="total-text">

        </li>
        <li class="addbox d-flex align-items-center">                      
        <label class="title-label">수량</label>
        <div class="input-group mb-3 ml-4">
            <div class="input-group-prepend">
                <button class="btn btn-outline-line" id="qdown" type="button">
                <i class="fa-solid fa-chevron-down"></i>
                </button>
            </div>
            <input type="number"
                    class="quantity"
                    id="quantity"
                    name="quantity"
                    value="1"
                    readonly>
            <div class="input-group-append">
                <button class="btn btn-outline-line" id="qup" type="button">
                <i class="fa-solid fa-chevron-up"></i>
            </button>
            </div>
            </div>
        </li>
        <li class="tomoney">

        </li>
    </ul>`;


    $('.size').change(function(){
        opt2 = Number($(this).find("option:selected").data('size')); //추가금액
        size = $(this).find("option:selected").val(); // 컬러값
        sizetxt = $(this).find("option:selected").text(); // 컬러한글값
        if(opt2 > 0) {
            opt2 = "(+" + opt2.toLocaleString() + "원)";
        }else{
            opt2 = "";
        }
        sizetxt += " " + opt2;
        optionText = `<p>${prtitle}, ${colortxt}-${sizetxt}</p>`;
        const oradd = $('.addquantity').html();
        $('.addquantity').html(oradd + opthtml);
        $('.total-text').html(optionText);
    });



    // $('#qup').click(function(){
    $(document).on('click',"#qup", function(){
        let quantity = Number($('#quantity').val());
        quantity += 1;
        if(quantity > 9){
            alert("최대수량입니다.");
            quantity = 9;
        }
        $('#quantity').val(quantity);
        totalmoney = (prprice * quantity);
        let tmoney = totalmoney.toLocaleString();
        let txt = "총 상품금액(수량) : <strong>"+ tmoney + "원</strong>("+quantity+"개)";
        $('.totalmoney').html(txt);
    });

    //$('#qdown').click(function(){
    $(document).on('click',"#qdown", function(){
        let quantity = Number($('#quantity').val());
        quantity -= 1;
        if(quantity < 1){
            quantity =1;
        }
        $('#quantity').val(quantity);
        totalmoney = (prprice * quantity);
        let tmoney = totalmoney.toLocaleString();
        let txt = "총 상품금액(수량) : <strong>"+ tmoney + "원</strong>("+quantity+"개)";
        $('.totalmoney').html(txt);
    });   
 });