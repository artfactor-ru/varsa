<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Корзина");?>



<?
CModule::IncludeModule('iblock');

$IBLOCK_ID = 7; // для работы формы
$cookieUser = "";
$arrayLinks = "";
$LincedIsEmpty = "";
$cookieUser = $_COOKIE["id_user"];


if($cookieUser != ''){

if(CModule::IncludeModule("iblock"))
{



        $rsItems = CIBlockElement::GetList(array(), array('IBLOCK_ID' =>'8', "=CODE"=>$cookieUser),false,false,array('ID', 'NAME', 'CODE', 'PROPERTY_*'));

        if ($arItem = $rsItems->GetNext()){
        
            $ORDER_ID = $arItem["ID"];
            $IBLOCK_ID_SELECTED = "8"; //N - ID инфоблока
            $ID_ELEMENT_SELECTED  = $ORDER_ID;//S - ID элемента


            $arrayLinks = array();

            $linkedArray = CIBlockElement::GetList(
                Array("ID" => "ASC"),
                Array("IBLOCK_ID" => $IBLOCK_ID_SELECTED, "ID" => $ID_ELEMENT_SELECTED),
                false,
                false,
                Array(
                    'ID',
                    'PROPERTY_SELECTED_PRODUCT'
                )
            );

            while ($ar_fields = $linkedArray->GetNext()) {
                $LincedIsEmpty = $ar_fields['PROPERTY_SELECTED_PRODUCT_VALUE'];//Если есть связанные
                $arrayLinks[] = $ar_fields['PROPERTY_SELECTED_PRODUCT_VALUE'];//ID связанных элементов в масиив

            }
        }
    }
}


?>



<div class="wrapper basket">
    <div class="container">
    <?$APPLICATION->IncludeComponent(
        "bitrix:breadcrumb",
        "",
        Array(
            "PATH" => "",
            "SITE_ID" => "s1",
            "START_FROM" => "0"
        )
    );?>
    </div>

    <div class="container">
  
        <h2>Корзина</h2>
        <?if (!empty($LincedIsEmpty)):?>

        <form id="basket" name="basket" action="/result.php" method="POST" enctype="multipart/form-data">
                <div class="basket__header">
                    <div class="name">Наименование товара</div>
                    <div class="count">Колличество</div>
                    <div class="total-price">Сумма</div>
                    <div class="delete">Удалить</div>
                
                </div>
                <ul class="basket__list">
                        <?
                        $GLOBALS['arrFilterLinked'] = array('ID' => $arrayLinks);
                        $APPLICATION->IncludeComponent(
                            "bitrix:news.list",
                            "basketlist",
                            Array(
                                "ACTIVE_DATE_FORMAT" => "d.m.Y",
                                "ADD_SECTIONS_CHAIN" => "N",
                                "AJAX_MODE" => "N",
                                "AJAX_OPTION_ADDITIONAL" => "",
                                "AJAX_OPTION_HISTORY" => "N",
                                "AJAX_OPTION_JUMP" => "N",
                                "AJAX_OPTION_STYLE" => "Y",
                                "CACHE_FILTER" => "N",
                                "CACHE_GROUPS" => "Y",
                                "CACHE_TIME" => "36000000",
                                "CACHE_TYPE" => "A",
                                "CHECK_DATES" => "Y",
                                "COMPONENT_TEMPLATE" => "basketlist",
                                "DETAIL_URL" => "",
                                "DISPLAY_BOTTOM_PAGER" => "Y",
                                "DISPLAY_DATE" => "Y",
                                "DISPLAY_NAME" => "Y",
                                "DISPLAY_PICTURE" => "Y",
                                "DISPLAY_PREVIEW_TEXT" => "Y",
                                "DISPLAY_TOP_PAGER" => "N",
                                "FIELD_CODE" => array(0=>"DETAIL_PICTURE",1=>"",),
                                "FILTER_NAME" => "arrFilterLinked",
                                "HIDE_LINK_WHEN_NO_DETAIL" => "N",
                                "IBLOCK_ID" => "6",
                                "IBLOCK_TYPE" => "catalog",
                                "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
                                "INCLUDE_SUBSECTIONS" => "Y",
                                "MESSAGE_404" => "",
                                "NEWS_COUNT" => "20",
                                "PAGER_BASE_LINK_ENABLE" => "N",
                                "PAGER_DESC_NUMBERING" => "N",
                                "PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
                                "PAGER_SHOW_ALL" => "N",
                                "PAGER_SHOW_ALWAYS" => "N",
                                "PAGER_TEMPLATE" => ".default",
                                "PAGER_TITLE" => "Новости",
                                "PARENT_SECTION" => "",
                                "PARENT_SECTION_CODE" => "",
                                "PREVIEW_TRUNCATE_LEN" => "",
                                "PROPERTY_CODE" => array(0=>"ARTICLE",1=>"FULLNAME",2=>"PRICE",3=>"",),
                                "SET_BROWSER_TITLE" => "N",
                                "SET_LAST_MODIFIED" => "N",
                                "SET_META_DESCRIPTION" => "N",
                                "SET_META_KEYWORDS" => "N",
                                "SET_STATUS_404" => "N",
                                "SET_TITLE" => "N",
                                "SHOW_404" => "N",
                                "SORT_BY1" => "ACTIVE_FROM",
                                "SORT_BY2" => "SORT",
                                "SORT_ORDER1" => "DESC",
                                "SORT_ORDER2" => "ASC",
                                "STRICT_SECTION_CHECK" => "N"
                            )
                        );?>



                </ul>


                    <div class="total">
                        <button class="button button--grey" type="reset">Очистить корзину</button>

                        <b>Итого к оплате <span><span id="all-sum">0</span> ₽</span></b>
                        <input type="hidden" name="allsum" value="" id="allsum-input">
                    </div>
            
            <div class="basket__wrapper">
                <div class="basket__column">


                    <div class="basket_form-wrap">
                        <h3 class="subtitle">Контактные данные</h3><br>
                        <input name="user_fio" type="text" placeholder="ФИО" min="2" required style="width:100%;">
                        <input name="user_tel" type="tel" placeholder="Телефон" required  style="width:100%;">
                        <input name="user_mail" type="email"  placeholder="Email" required style="width:100%;">
                    </div>
                   <!-- <div class="basket_form-wrap">
                        <h3 class="subtitle">Cпособ доставки</h3>

                        <div class="basket__check-wrap">
                                <input type="radio" name="delivery" value="Курьером по Санкт-Петербургу" id="type-1" checked>
                                <div>
                                    <label for="type-1" class="radio__label">Курьером по Санкт-Петербургу</label>
                                    <p class="desc">При заказе от 1000 рублей доставка бесплатно в границах КАД!</p>
                                    <p class="cost">Стоимость доставки:<span>0 рублей</span></p>
                                </div> 
                        </div>
                        <div class="basket__check-wrap">
                                <input type="radio" name="delivery" value="Транспортной компанией по РФ" id="type-2">
                                    <div>
                                        <label for="type-2" class="radio__label">Транспортной компанией по РФ</label>
                                        <p class="desc">Доставка транспортной компанией СДЭК. Доставка оплачивается ПРИ ПОЛУЧЕНИИ. Точная стоимость и сроки доставки будет определена после согласования с менеджером.</p>
                                        <p class="cost">Стоимость доставки:<span>0 рублей</span></p>
                                    </div>
                        </div>

                        <div class="basket__check-wrap">
                                <input type="radio" name="delivery" value="Почтой России" id="type-3" >
                                    <div>
                                        <label for="type-3" class="radio__label">Почтой России</label>
                                        <p class="desc">Доставка оплачивается ПРИ ПОЛУЧЕНИИ. Точная стоимость и сроки доставки будет определена после согласования с менеджером.</p>
                                        <p class="cost">Стоимость доставки:<span>0 рублей</span></p>
                                    </div>
                        </div>

                        <div class="basket__check-wrap">
                                <input type="radio" name="delivery" value="Самовывоз" id="type-4" >
                                    <div>
                                        <label for="type-4" class="radio__label">Самовывоз</label>
                                        <p class="desc">Самовывоз по адресу: Санкт-Петербург, ул. Комиссара Смирнова, 11д, оф. 320.</p>
                                        <p class="cost">Стоимость доставки:<span>0 рублей</span></p>
                                    </div>
                        </div>

                        <div class="basket__check-wrap">
                                <input type="radio" name="delivery" value="Для участников Троицкого потребительского общества" id="type-5" >
                                    <div>
                                        <label for="type-5" class="radio__label">Для участников Троицкого потребительского общества</label>
                                        <p class="desc">Участникам Троицкого потребительского общества скидка на продукцию и доставку 15%!. Точную стоимость уточняйте у менеджера.</p>
                                        <p class="cost">Стоимость доставки:<span>0 рублей</span></p>
                                    </div>
                        </div>

                        <div class="basket__check-wrap">
                                <input type="radio" name="delivery" value="Доставка курьером за КАД по Санкт-Петербургу" id="type-6" >
                                    <div>
                                        <label for="type-6" class="radio__label">Доставка курьером за КАД по Санкт-Петербургу</label>
                                       
                                        <p class="cost">Стоимость доставки:<span>350 рублей</span></p>
                                    </div>
                        </div>
                        
                   </div> -->
<!-- 
                   <div class="basket_form-wrap">
                        <h3 class="subtitle">Скидки и промокоды</h3>

                        <input name="user_promo" type="text" placeholder="Введите код">
                    </div> -->

                    
                </div>

                <div class="basket__column">
                    <div class="basket_form-wrap">
                        <h3 class="subtitle">Адрес доставки</h3>
                        <input name="user_city" type="text" placeholder="Город">
                        <input name="user_road" type="text" placeholder="Улица">
                        <input name="user_house" type="text" placeholder="Дом/Корпус">
                        <input name="user_apart" type="text" placeholder="Квартира">
                        <textarea name="user_comment" id="" placeholder="Комментарий"></textarea>
                    </div>
                
                    <!-- <div class="basket_form-wrap">
                         <h4 class="subtitle">Способ оплаты</h4>
                            <div class="basket__check-wrap">
                                <input type="radio" name="pay" value="Оплата картой или наличными при получении" id="pay-type-1" checked>
                                <div>
                                    <label for="pay-type-1" class="radio__label">Оплата картой или наличными при получении</label>
                                    <p class="desc">При самовывозе или доставке в пределах Санкт-Петербурга. Также доступно для участников Троицкого потребительского общества</p>
                                </div>
                               
                            </div>
                    </div> -->
                </div>
                
            </div>
            <button class="button button--gradient" type="submit">Оформить заказ</button>
        </form>


        <section class="delivery">
        <h2>Оплата и доставка</h2>

            <?$APPLICATION->IncludeComponent(
                            "bitrix:main.include",
                            "",
                            Array(
                                "AREA_FILE_SHOW" => "file",
                                "AREA_FILE_SUFFIX" => "inc",
                                "EDIT_TEMPLATE" => "",
                                "PATH" => "/include/step-detail.php"
                            )
                        );?>

            <div class="delivery__wrap">
                <div class="delivery__types">
                <h3 class="subtitle">Курьерская доставка</h3>
                    <div class="delivery__types-header">
                        <div>куда</div>
                        <div>когда</div>
                        <div>цена</div>
                    </div>

                    <div class="delivery__type">
                        <?$APPLICATION->IncludeComponent(
                                "bitrix:main.include",
                                "",
                                Array(
                                    "AREA_FILE_SHOW" => "file",
                                    "AREA_FILE_SUFFIX" => "inc",
                                    "EDIT_TEMPLATE" => "",
                                    "PATH" => "/include/delivery-type1.php"
                                )
                            );?>
                    </div>

                    <div class="delivery__type">
                        <?$APPLICATION->IncludeComponent(
                                "bitrix:main.include",
                                "",
                                Array(
                                    "AREA_FILE_SHOW" => "file",
                                    "AREA_FILE_SUFFIX" => "inc",
                                    "EDIT_TEMPLATE" => "",
                                    "PATH" => "/include/delivery-type2.php"
                                )
                            );?>
                        
                    </div>
                    <h3 class="subtitle">Самовывоз</h3>

                    <div class="delivery__type">
                        <div class="adress-js"><?$APPLICATION->IncludeComponent(
                                "bitrix:main.include",
                                "",
                                Array(
                                    "AREA_FILE_SHOW" => "file",
                                    "AREA_FILE_SUFFIX" => "inc",
                                    "EDIT_TEMPLATE" => "",
                                    "PATH" => "/include/adress.php"
                                )
                            );?></div>

                            <?$APPLICATION->IncludeComponent(
                                "bitrix:main.include",
                                "",
                                Array(
                                    "AREA_FILE_SHOW" => "file",
                                    "AREA_FILE_SUFFIX" => "inc",
                                    "EDIT_TEMPLATE" => "",
                                    "PATH" => "/include/delivery-type3.php"
                                )
                            );?>
                     
                    </div>

                    <div id="yandexmapa">
                    <div id="lat" style="display:none;"><?$APPLICATION->IncludeComponent(
                            "bitrix:main.include",
                            "",
                            Array(
                                "AREA_FILE_SHOW" => "file",
                                "AREA_FILE_SUFFIX" => "inc",
                                "EDIT_TEMPLATE" => "",
                                "PATH" => "/include/lat.php"
                            )
                        );?></div>
                        <div id="lon" style="display:none;">
                        <?$APPLICATION->IncludeComponent(
                            "bitrix:main.include",
                            "",
                            Array(
                                "AREA_FILE_SHOW" => "file",
                                "AREA_FILE_SUFFIX" => "inc",
                                "EDIT_TEMPLATE" => "",
                                "PATH" => "/include/lon.php"
                            )
                        );?>
                        </div>
                    </div>
                </div>

                <div class="delivery__aside">
                    <h3 class="subtitle">Способы оплаты</h3>
                    <?$APPLICATION->IncludeComponent(
                        "bitrix:main.include",
                        "",
                        Array(
                            "AREA_FILE_SHOW" => "file",
                            "AREA_FILE_SUFFIX" => "inc",
                            "EDIT_TEMPLATE" => "",
                            "PATH" => "/include/pay-detail.php"
                        )
                    );?>
                </div>
            </div>
            <div class="delivery__text">
                <?$APPLICATION->IncludeComponent(
                    "bitrix:main.include",
                    "",
                    Array(
                        "AREA_FILE_SHOW" => "file",
                        "AREA_FILE_SUFFIX" => "inc",
                        "EDIT_TEMPLATE" => "",
                        "PATH" => "/include/delivery-detail.php"
                    )
                );?>
            </div>
        </section>
        <?else:?>

           
                <h3 style="color:#149437;">В корзине 0 товаров</h3>
                <section class="delivery">
            <h2>Оплата и доставка</h2>

            <?$APPLICATION->IncludeComponent(
                            "bitrix:main.include",
                            "",
                            Array(
                                "AREA_FILE_SHOW" => "file",
                                "AREA_FILE_SUFFIX" => "inc",
                                "EDIT_TEMPLATE" => "",
                                "PATH" => "/include/step-detail.php"
                            )
                        );?>


            <div class="delivery__wrap">
                <div class="delivery__types">
                <h3 class="subtitle">Курьерская доставка</h3>
                    <div class="delivery__types-header">
                        <div>куда</div>
                        <div>когда</div>
                        <div>цена</div>
                    </div>

                    <div class="delivery__type">
                        <?$APPLICATION->IncludeComponent(
                                "bitrix:main.include",
                                "",
                                Array(
                                    "AREA_FILE_SHOW" => "file",
                                    "AREA_FILE_SUFFIX" => "inc",
                                    "EDIT_TEMPLATE" => "",
                                    "PATH" => "/include/delivery-type1.php"
                                )
                            );?>
                    </div>

                    <div class="delivery__type">
                        <?$APPLICATION->IncludeComponent(
                                "bitrix:main.include",
                                "",
                                Array(
                                    "AREA_FILE_SHOW" => "file",
                                    "AREA_FILE_SUFFIX" => "inc",
                                    "EDIT_TEMPLATE" => "",
                                    "PATH" => "/include/delivery-type2.php"
                                )
                            );?>
                        
                    </div>
                    <h3 class="subtitle">Самовывоз</h3>

                    <div class="delivery__type">
                        <div class="adress-js"><?$APPLICATION->IncludeComponent(
                                "bitrix:main.include",
                                "",
                                Array(
                                    "AREA_FILE_SHOW" => "file",
                                    "AREA_FILE_SUFFIX" => "inc",
                                    "EDIT_TEMPLATE" => "",
                                    "PATH" => "/include/adress.php"
                                )
                            );?></div>

                            <?$APPLICATION->IncludeComponent(
                                "bitrix:main.include",
                                "",
                                Array(
                                    "AREA_FILE_SHOW" => "file",
                                    "AREA_FILE_SUFFIX" => "inc",
                                    "EDIT_TEMPLATE" => "",
                                    "PATH" => "/include/delivery-type3.php"
                                )
                            );?>
                     
                    </div>

                    <div id="yandexmapa">
                        <div id="lat" style="display:none;"><?$APPLICATION->IncludeComponent(
                            "bitrix:main.include",
                            "",
                            Array(
                                "AREA_FILE_SHOW" => "file",
                                "AREA_FILE_SUFFIX" => "inc",
                                "EDIT_TEMPLATE" => "",
                                "PATH" => "/include/lat.php"
                            )
                        );?></div>
                        <div id="lon" style="display:none;">
                        <?$APPLICATION->IncludeComponent(
                            "bitrix:main.include",
                            "",
                            Array(
                                "AREA_FILE_SHOW" => "file",
                                "AREA_FILE_SUFFIX" => "inc",
                                "EDIT_TEMPLATE" => "",
                                "PATH" => "/include/lon.php"
                            )
                        );?>
                        </div>
                    </div>
                </div>

                <div class="delivery__aside">
                <h3 class="subtitle">Способы оплаты</h3>
                    <?$APPLICATION->IncludeComponent(
                            "bitrix:main.include",
                            "",
                            Array(
                                "AREA_FILE_SHOW" => "file",
                                "AREA_FILE_SUFFIX" => "inc",
                                "EDIT_TEMPLATE" => "",
                                "PATH" => "/include/pay-detail.php"
                            )
                        );?>
                </div>
            </div>
            <div class="delivery__text">
            <?$APPLICATION->IncludeComponent(
                "bitrix:main.include",
                "",
                Array(
                    "AREA_FILE_SHOW" => "file",
                    "AREA_FILE_SUFFIX" => "inc",
                    "EDIT_TEMPLATE" => "",
                    "PATH" => "/include/delivery-detail.php"
                )
            );?>
          
            </div>
        </section>
            
        <?endif;?>
    </div>
</div>



<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>