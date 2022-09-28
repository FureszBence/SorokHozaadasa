<?php
require_once("dataBaseConnect.php");

$db = new Database();

$sql = "SELECT * FROM `lists`";
$elemek = $db->runsqlassoc($sql);


function dynamicSelectList($tabla, $id, $mezo, $name, $selectID) {
	$db = new Database();

	$sql = "
		SELECT $id, $mezo
		FROM $tabla
		ORDER BY $id
	";
	
	$res = $db->runsqlassoc($sql);
	
	$select = '<select id="'.$name.'" name="'.$name.'[]" class="form-select form-select-sm rounded-0">';
	$select .= '<option value="0">Válasszon</option>';
	
	if($res["num_rows"] > 0) {
		foreach($res["data"] AS $s) {
			$selected = (isset($selectID) AND  $selectID == $s[$id]) ? ' selected="selected"' : '';
			
			$select .= '<option value="'.$s[$id].'" '.$selected.'>'.$s[$mezo].'</option>'."\n";
		}
	}
	
	$select .= '</select>';
	
	return $select;
}

$output = array();

foreach($elemek['data'] AS $rows) {
	
	$twoVal = dynamicSelectList("list_days", "daysID", "days_name", "selectNAME", $rows["twoVal"]);
	$fourVal = dynamicSelectList("list_days", "daysID", "days_name", "selectNAME", $rows["fourVal"]);
	
	$aa = array();

	$aa[] = '<input id="oneID" name="oneName[]" class="form-control form-control-sm rounded-0" placeholder="onePLC" value="'.$rows["oneVal"].'">';
	$aa[] = $twoVal;
	$aa[] = '<input id="threeID" name="threeName[]" class="form-control form-control-sm rounded-0" placeholder="threePLC" value="'.$rows["threeVal"].'">';
	$aa[] = $fourVal;

	$output[] = $aa;
}

echo json_encode($output);
?>