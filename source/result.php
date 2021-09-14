<?
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
define("NO_KEEP_STATISTIC", true);
define("NOT_CHECK_PERMISSIONS", true);
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
?>



<?

use Bitrix\Main\Mail\Event;

// if (!empty($_REQUEST['user_fio']) and !empty($_REQUEST['user_city'])) {

    CModule::IncludeModule('iblock');



    echo 'Вот такие данные мы передали';
    echo '<pre>';
    print_r($_POST);
    echo '<pre>';


    //Погнали
    $el = new CIBlockElement;
    $iblock_id = 7;
    $basket_id = 8;
    // $section_id = false;
    // $section_id[$i] = $_POST['section_id']; //Разделы для добавления
    $cookieUser = "";
    $cookieUser = $_COOKIE["id_user"];
    //Свойства
    $PROP = array();

    $PROP['USER_FIO'] = $_POST['user_fio']; 
    $PROP['USER_PHONE'] = $_POST['user_tel']; 
    $PROP['USER_EMAIL'] = $_POST['user_mail'];  
    $PROP['PROMO'] = $_POST['user_promo']; 
    $PROP['USER_CITY'] = $_POST['user_city']; 
    $PROP['USER_ROAD'] = $_POST['user_road']; 
    $PROP['USER_HOUSE'] = $_POST['user_house']; 
    $PROP['USER_APART'] = $_POST['user_apart']; 
    $PROP['USER_COMMENT'] = $_POST['user_comment']; 

    // $PROP['PAY'] = $_POST['pay']; 
    // $PROP['DELIVERY'] = $_POST['delivery']; 

    $productsID = $_POST['product_id'];


    $text = 'Товар 1: -' . $_POST['product_info-1'] . 'Количество: '. $_POST['quantity-1'] . ' шт.' . 'Общая сумма:' . $_POST['totalsum-1'] .'руб.' .';-------------------------------------------------' . '' . 'Товар 2: -' . $_POST['product_info-2'] . 'Количество: '. $_POST['quantity-2'] . ' шт.'  . 'Общая сумма:' . $_POST['totalsum-2'] .'руб.' .';--------------------------------------------' . 'Товар 3: -' . $_POST['product_info-3'] . 'Количество: '. $_POST['quantity-3'] . ' шт.'  . 'Общая сумма:' . $_POST['totalsum-3'] .'руб.' .';';

    $PROP['ORDER'] = $text;


    $PROP['TOTAL_SUM'] = $_POST['allsum']; 

    //Основные поля элемента
    $fields = array(
        "DATE_CREATE" => date("d.m.Y H:i:s"), //Передаем дата создания
        // "CREATED_BY" => $GLOBALS['USER']->GetID(),    //Передаем ID пользователя кто добавляет
        // "IBLOCK_SECTION_ID" => $section_id[], //ID разделов
        "IBLOCK_ID" => $iblock_id, //ID информационного блока он 24-ый
        "PROPERTY_VALUES" => $PROP, // Передаем массив значении для свойств
        "NAME" => $_POST['user_fio'],
        "ACTIVE" => "Y" //поумолчанию делаем активным или ставим N для отключении поумолчанию
        // "PREVIEW_TEXT" => strip_tags($_REQUEST['description']), //Анонс
        // "PREVIEW_PICTURE" => $_FILES['image'], //изображение для анонса
        // "DETAIL_TEXT"    => strip_tags($_REQUEST['description_detail'],
        // "DETAIL_PICTURE" => $_FILES['image_detail'] //изображение для детальной страницы
    );
    
    
   



    //Результат в конце отработки
    if ($ID = $el->Add($fields)) {
        echo "Сохранено";


        Event::send(array(
                       "EVENT_NAME" => "MADE_ORDER",
                       "LID" => "s1",
                       "C_FIELDS" => array(
                           "EMAIL_TO" => 'katyazanina95@gmail.com, worker.olesia.bolibok@gmail.com',
                           "NAME" => $_POST['user_fio'],
                           "PHONE" => $_POST['user_tel'],
                           "EMAIL" => $_POST['user_mail'],
                        //    "PROMO" => $_POST['user_promo'],
                           "USER_CITY" => $_POST['user_city'],
                           "USER_ROAD" => $_POST['user_road'],
                           "USER_HOUSE" => $_POST['user_house'],
                           "USER_APART" => $_POST['user_apart'],
                           "USER_COMMENT" => $_POST['user_comment'],

                          
                            "PRODUCT1" => 'Товар 1 ' . $_POST['product_info-1'],
                            "PRODUCT1_COUNT" =>'В колличестве ' .  $_POST['quantity-1'] . ' шт',
                            "PRODUCT1_TOTAL" => 'Cтоимость ' . $_POST['totalsum-1'] . ' руб.',
                           
                       
                            "PRODUCT2" => 'Товар 2 ' . $_POST['product_info-2'],
                            "PRODUCT2_COUNT" => 'В колличестве ' .  $_POST['quantity-2'] . ' шт',
                            "PRODUCT2_TOTAL" => 'Cтоимость ' . $_POST['totalsum-2'] . ' руб.',
                           

                       
                            "PRODUCT3" => 'Товар 3 ' . $_POST['product_info-3'],
                            "PRODUCT3_COUNT" => 'В колличестве' .  $_POST['quantity-3'] . ' шт',
                            "PRODUCT3_TOTAL" => 'Cтоимость' . $_POST['totalsum-3'] . 'руб.',
                           

                         

                           "ALL_TOTAL" => $_POST['allsum'],
                        //    "PAY" => $_POST['pay'], 
                        //    "DELIVERY" => $_POST['delivery'],
                        //   
                       ),
                   ));
    } else {
        echo 'Произошел как-то косяк Попробуйте еще разок';
    }
// }
?>
   
<? require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>