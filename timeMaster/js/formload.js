
var my;
var http_request = false;
var Apost_office;

function getHTTPObject() {
  var xmlhttp;
 
  if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
  }
  else if (window.ActiveXObject){
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    if (!xmlhttp){
        xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
    
}
  return xmlhttp;  
}

var http = getHTTPObject(); // We create the HTTP Object

function requestInfo(url,id,redirectPage) {   
		var temp=new Array();
			http.open("GET", url, true);
			http.onreadystatechange = function() {
				if (http.readyState == 4) {
				  if(http.status==200) {
			  		var results=http.responseText;
					if(redirectPage=="" || results!="1") {
						
						var temp=id.split("~"); // To display on multiple div 
						//alert(temp.length);
						var r=results.split("~"); // To display multiple data into the div 
						//alert(temp.length);
						if(temp.length>1) {
							for(i=0;i<temp.length;i++) {	
								//alert(temp[i]);
								document.getElementById(temp[i]).innerHTML=r[i];
							}
						} else {
							document.getElementById(id).innerHTML = results;
						}	
					} else {
						//alert(results);
						window.location.href=redirectPage;			
					}
				  } 
  				}
			};
			http.send(null);
}

function emptyValidation(fieldList) {
		
		var field=new Array();
		field=fieldList.split("~");
		var counter=0;
		for(i=0;i<field.length;i++) {
			if(document.getElementById(field[i]).value=="") {
				document.getElementById(field[i]).style.backgroundColor="#FF0000";
				counter++;
			} else {
				document.getElementById(field[i]).style.backgroundColor="#FFFFFF";	
			}
		}
		if(counter>0) {
				alert("The Field mark as red could not left empty");
				return false;
				
		}  else {
			return true;
		}
		
}


/*------------------------------------------------------------ */

function makeRequest(url, parameters) {
      http_request = false;
      if (window.XMLHttpRequest) { // Mozilla, Safari,...
         http_request = new XMLHttpRequest();
         if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
         }
      } else if (window.ActiveXObject) { // IE
         try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e) {
            try {
               http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
         }
      }
      if (!http_request) {
         alert('Cannot create XMLHTTP instance');
         return false;
      }

      http_request.onreadystatechange = alertContents;
      http_request.open('GET', url + parameters, true);
      http_request.send(null);
}
   

function alertContents() {
	
      if (http_request.readyState == 4) {
         if (http_request.status == 200) {
            //alert(http_request.responseText);
            result = http_request.responseText;
			document.getElementById(Apost_office).innerHTML = "";
            document.getElementById(Apost_office).innerHTML = result; 
			
         } else {
            alert('There was a problem with the request.');
         }
      }
}

function makeHttpObject() {
    var xmlHttpObj;
    // branch for Activex version (Microsoft IE)
    /*@cc_on
    @if (@_jscript_version >= 5)
        try {
            xmlHttpObj = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttpObj = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlHttpObj = false;
            }
        }
    @else
        xmlHttpObj = false;
    @end @*/
    // branch for native XMLHttpRequest object (Mozilla & Safari)
    if (!xmlHttpObj && typeof XMLHttpRequest != 'undefined') {
        try {
            xmlHttpObj = new XMLHttpRequest();
        } catch (e) {
            xmlHttpObj = false;
        }
    }
    return xmlHttpObj;
}
var httpObj = makeHttpObject(); // create the HTTP Object

function getHttpResponse() {
    if (httpObj.readyState == 4) {
        if (httpObj.status == 200) {
			
            content = httpObj.responseText;
            div = document.getElementById("post_office");
            div.innerHTML = "";
            // insert HTML content into "post_office" <div>
            div.innerHTML = content;

        } else {
            alert("There was a problem with the response" + httpObj.statusText);
        }
    }
	else {
	        div = document.getElementById("post_office");
            div.innerHTML = "<font size=10 color=red>Loading..</font>";
			
	}
}


function getNewWindow(url){
	if (!newWindow || newWindow.closed) {
		newWindow = window.open (url); 
        if (!newWindow.opener) {
        newWindow.opener = window
        }
    } else {
        // window's already open; bring to front
        newWindow.focus()
    }	
}


function login_pass(obj){
var getstr="?";
//getstr += "Voucher_No" + "=" + document.getElementById('edt_Voucher').value + "&"; 
getstr += "u_name" + "=" +document.getElementById('username').value + "&";
getstr += "pass" + "=" +document.getElementById('password').value+"&";
getstr +="id" + "=" +my;
var url="pageNav.php";
makeRequest(url,getstr);

}

function getPgName(pd) {
	//alert(status);
	//var url = "Pages/pageNav.php?id="; // URL for server-side PHP script
	var url='index.php?';
	Apost_office = "post_office";
	//alert(url+pd);
	makeRequest(url, pd);
}

function getChildPgName(controller,action,aval){
	
	var url='index.php?';
	var pd='controller='+controller+'&action='+action+'&type=child'+'&blog_desc='+aval;
	Apost_office = action;
	//alert(url+pd);
	makeRequest(url, pd);
}

function ReplyPost(controller,action,aval,mid){
	var url='index.php?';
	var pd='controller='+controller+'&action='+action+'&type=child'+'&blog_desc='+aval+'&mid='+mid;
	Apost_office = 'divrep'+mid;
	//alert(url+pd);
	makeRequest(url, pd);
	
}


function textClear(){
	document.getElementById('blog_desc_rep').innerHTML='';
	
}

function getPgNameAddJob(obj) {
	var getstr = "?";
	if (my==33){
	getstr += "id" + "=" + my ; 
	var url = "add_new_job.php"; // URL for server-side PHP script
	}
	else {
	getstr += "id" + "=" + my + "&";
	getstr += "srcJobby" + "=" + document.getElementById('job_refno').value+ "&"; 
	getstr += "srcByDept" + "=" + document.getElementById('Department').value+ "&"; 
	if (document.getElementById('Department').value !=''){
	getstr += "srcByName" + "=" + document.getElementById('UserName').value+ "&";
	} 
	getstr += "date_start" + "=" + document.getElementById('date_start').value+ "&"; 
	getstr += "date_to" + "=" + document.getElementById('date_to').value; 
	var url = "vwJobDetail.php";
	
	}
	Apost_office = "view_job";
	makeRequest(url, getstr);
}

function ShowData(obj){
    
	 var getstr = "?";
	 getstr += "new_id" + "=" + my + "&"; 
	 getstr += "srcByName" + "=" + document.getElementById('srcByFileName').value; 
	 //alert(getstr);
     var url = "file_upload.php"; // URL for server-side PHP script
	 
	 Apost_office = "post_office";
	 //alert(getstr);
	 makeRequest(url, getstr);

	}
	
function ShowDocData(obj){
	 var getstr = "?";

	 //getstr += "srcCategory" + "=" + document.getElementById('srcCategory').value + "&"; 
	 //getstr += "srcSubject" + "=" + document.getElementById('srcSubject').value + "&";
	 getstr += "srcByFileName" + "=" + document.getElementById('srcByFileName').value; 
	 
     var url = "ShowDetail.php"; // URL for server-side PHP script
	 Apost_office = "post_office";
	 //alert(getstr);
	 makeRequest(url, getstr);

	}



function SaveUser(obj,mode,id){
	var getstr = "?";
	getstr += "mode" + "=" + mode + "&"; 
	getstr += "id" + "=" + id + "&"; 
	getstr += "UserName" + "=" + document.getElementById('edtUname').value + "&"; 
	getstr += "LoginName" + "=" + document.getElementById('edtLogname').value + "&"; 
	getstr += "UPassword" + "=" + document.getElementById('edtPassword').value + "&"; 
	getstr += "User_type" + "=" + document.getElementById('User_type').value + "&"; 
	getstr += "Status" + "=" + document.getElementById('Status').value + "&"; 
	getstr += "Insert_mode" + "=" + document.getElementById('Insert_mode').value + "&"; 
	getstr += "update_mode" + "=" + document.getElementById('update_mode').value + "&"; 
	getstr += "Delete_mode" + "=" + document.getElementById('Delete_mode').value + "&";  
	getstr += "DepartmentID" + "=" + document.getElementById('DeptName').value + "&";  
	getstr += "desig_name" + "=" + document.getElementById('desig_name').value;
	
	
	var url = "admin.php"; // URL for server-side PHP script
	Apost_office = "post_office";
	makeRequest(url, getstr);
	
	}
	
function AddNewJob(obj){
	var getstr = "?";
	getstr += "id" + "=" + my + "&"; 
	getstr += "jobdescription" + "=" + document.getElementById('jobdescription_id').value + "&";
	getstr += "comments" + "=" + document.getElementById('comments').value + "&";
	getstr += "duration" + "=" + document.getElementById('duration').value+ "&";
	getstr += "job_type" + "=" + document.getElementById('job_type').value+ "&";
	getstr += "assign_to" + "=" + document.getElementById('assign_to').value;
	//alert(getstr);
	
	var url = "QueryNav.php";
	Apost_office = "view_job";
	//alert(url+getstr);
	makeRequest(url, getstr);
	}	
	
function JobUpdate(obj){
	var getstr = "?";
	getstr += "id" + "=" + my + "&"; 
	getstr += "job_id" + "=" + document.getElementById('job_id_hidden').value + "&";
	getstr += "jobdescription" + "=" + document.getElementById('jobdescription_id').value + "&";
	getstr += "assignTo" + "=" + document.getElementById('user_name').value + "&";
	getstr += "jobsdate" + "=" + document.getElementById('jobsdate').value + "&";
	getstr += "duration" + "=" + document.getElementById('duration').value + "&";
	getstr += "jobstatus" + "=" + document.getElementById('job_status').value + "&";
	getstr += "remark" + "=" + document.getElementById('remarks').value;
	
	var url = "QueryNav.php";
	Apost_office = "view_job";
	//alert(url+getstr);
	makeRequest(url, getstr);
	}	
	
function jobforward(obj){
	var getstr = "?";
	getstr += "id" + "=" + my + "&"; 
	getstr += "job_id" + "=" + document.getElementById('job_id_hidden').value + "&";
	getstr += "assignTo" + "=" + document.getElementById('user_name').value + "&";
	getstr += "remark" + "=" + document.getElementById('remarks').value;
	//alert(getstr);
	var url = "QueryNav.php";
	Apost_office = "view_job";
	
	makeRequest(url, getstr);
	}
	
function editjobapproved(job_id,user_id){
	var getstr = "?";
	getstr += "id" + "=" + my + "&"; 
	getstr += "job_id" + "=" + job_id + "&";
	getstr += "ApprovedBy" + "=" + user_id;
	
	var is_confirmed = confirm('Approved?');
    if (is_confirmed) {
        var url = "QueryNav.php";
		Apost_office = "view_job";	
		makeRequest(url, getstr);
    }	
}
	
function ItemIssue(obj){
	var getstr = "?";
	getstr += "id" + "=" + my + "&"; 
	getstr += "item_name" + "=" + document.getElementById('item_name').value + "&";
	getstr += "itemdescription" + "=" + document.getElementById('itemdescription').value + "&";
	getstr += "assignTo" + "=" + document.getElementById('user_name').value + "&";
	getstr += "itemdate" + "=" + document.getElementById('itemdate').value + "&";
	getstr += "itemprice" + "=" + document.getElementById('itemprice').value;	
	var url = "QueryNav.php";
	Apost_office = "view_item";
	//alert(url+getstr);
	makeRequest(url, getstr);
	}	
	

function JobCompleteUpdate(obj){
	var getstr = "?";
	getstr += "id" + "=" + my + "&"; 
	getstr += "job_id" + "=" + document.getElementById('job_id_hidden').value + "&";
	getstr += "Correctness" + "=" + document.getElementById('Correctness').value;
	var is_confirmed = confirm('Completed?');
    if (is_confirmed) {
	var url = "QueryNav.php";
	Apost_office = "view_job";
	//alert(url+getstr);
	makeRequest(url, getstr);
	}
}

function job_cancle(job_id){
	var getstr = "?";
	getstr += "id" + "=" + my + "&"; 
	getstr += "job_id" + "=" +job_id ;
	var is_confirmed = confirm('Cancle?');
    if (is_confirmed) {
	var url = "QueryNav.php";
	Apost_office = "view_job";
	//alert(url+getstr);
	makeRequest(url, getstr);
	}
}

function JobSrcByName(){
	var getstr = "?";
	getstr += "id" + "=" + my + "&";
	getstr += "srcJobby" + "=" + document.getElementById('srcJobby').value;
	var url = "vwjobDetail.php";
	Apost_office = "view_job";
	makeRequest(url, getstr);
}

function ShowJobReport(obj){
	var getstr = "?";
	getstr += "id" + "=" + my + "&";	
	getstr += "username" + "=" + document.getElementById('user_name').value + "&"; 
	getstr += "dateFrom" + "=" + document.getElementById('jobsdateFrom').value + "&"; 
	getstr += "dateTo" + "=" + document.getElementById('jobsdateTo').value;
	var url = "vwJobReport.php";
	Apost_office = "view_jobReport";
	makeRequest(url, getstr);	
}
	
function UpdateUser(obj){
	var getstr = "?mode=U&";
	getstr += "UserName" + "=" + document.getElementById('edtUname').value + "&"; 
	getstr += "LoginName" + "=" + document.getElementById('edtLogname').value + "&"; 
	getstr += "UPassword" + "=" + document.getElementById('edtPassword').value + "&"; 
	getstr += "User_type" + "=" + document.getElementById('User_type').value + "&"; 
	getstr += "Status" + "=" + document.getElementById('Status').value + "&"; 
	getstr += "Insert_mode" + "=" + document.getElementById('Insert_mode').value + "&"; 
	getstr += "update_mode" + "=" + document.getElementById('update_mode').value + "&"; 
	getstr += "Delete_mode" + "=" + document.getElementById('Delete_mode').value + "&"; 
	getstr += "DepartmentID" + "=" + document.getElementById('DeptName').value; 
	
	
	var url = "admin.php"; // URL for server-side PHP script
	Apost_office = "post_office";
	makeRequest(url, getstr);
	}
	
function GetUser(Astr){
	var getstr = "?mode=U&";
	getstr += Astr;
	var url = "UpdateUser.php"; // URL for server-side PHP script
	Apost_office = "UserInfo";
	makeRequest(url, getstr);
	}
	
function confirmLink(theLink)
{
   
    var is_confirmed = confirm('Are you sure to delete this record?\n\nThis will permanently delete the Record!');
    if (is_confirmed) {
        theLink.href += '';
    }

    return is_confirmed;
}


function editIssue(job_id,assign_to,jobvalues,job_estimate_day,jobsdate,remarks,job_refno){
	
	document.getElementById('jbo_completehead').style.display="none";
	document.getElementById('body_jobhead').style.display="Block";
	//document.getElementById('jbo_forward').style.display="Block";
	document.getElementById('Add_job').style.display="none";
	document.getElementById('update_task').style.display="block";	
	document.getElementById('forward_job').style.display="none";
	
	document.getElementById('job_id_hidden').value=job_id;
	document.getElementById('user_name').value=assign_to;
	document.getElementById('jobdescription_id').value=jobvalues;
	document.getElementById('duration').value=job_estimate_day;
	document.getElementById('jobsdate').value= jobsdate;
	document.getElementById('remarks').value= remarks;
	document.getElementById('job_refno').value=job_refno;

	return false;
}

function editjobfwd(job_id,job_refno){
	//alert(job_refno);
	/*document.getElementById('jbo_completehead').style.display="none";
	document.getElementById('body_jobhead').style.display="none";
	
	document.getElementById('Add_job').style.display="none";
	document.getElementById('update_job').style.display="none";
	document.getElementById('forward_job').style.display="Block";*/
	document.getElementById('jbo_forward').style.display="Block";
	document.getElementById('job_id_hidden').value=job_id;
	document.getElementById('job_refno').value=job_refno;
	
	return false;
	}


function editjobcomplete(job_id,job_refno){
	var getstr = "?";
	getstr += "id" + "=" + my + "&"; 
	getstr += "job_id" + "=" + job_id + "&"; 
	var is_confirmed = confirm('Completed?');
	if (is_confirmed) {
	Apost_office="view_job";
	var url = "QueryNav.php";
	makeRequest(url, getstr);
	}
}

function editnotecomplete(job_id){
	var getstr = "?";
	getstr += "id" + "=" + my + "&"; 
	getstr += "note_id" + "=" + job_id + "&"; 
	var is_confirmed = confirm('Completed?');
	if (is_confirmed) {
	Apost_office="divnote";
	var url = "QueryNav.php";
	makeRequest(url, getstr);
	}
}
	
	
function saveIssue(obj){
	
	var getstr = "?";
	getstr += "id" + "=" + my + "&"; 
	getstr += "job_id" + "=" + document.getElementById('jobs_id').value + "&"; 
	getstr += "jobdescription" + "=" + document.getElementById('jobdescription_id').value + "&"; 
	getstr += "jobsdate" + "=" + document.getElementById('job_sdate').value + "&";
	getstr += "job_estimate_day" + "=" + document.getElementById('job_estimate_day').value + "&";
	getstr += "jobstatus" + "=" + document.getElementById('job_status').value + "&";
	getstr += "remark" + "=" + document.getElementById('remarks').value;
	
	Apost_office=obj;
	var url = "QueryNav.php";
	makeRequest(url, getstr);
	
	}
		
	
function savedata(obj){
	var getstr = "?";
	getstr += "id" + "=" + 11 + "&";
	getstr += "empcode" + "=" + document.getElementById('empcode').value + "&";
	getstr += "username" + "=" + document.getElementById('username').value + "&";
	getstr += "Department" + "=" + document.getElementById('Department').value + "&";
	getstr += "Designation" + "=" + document.getElementById('Designation').value + "&";
	getstr += "Line" + "=" + document.getElementById('Line').value + "&";
	getstr += "emp_cate" + "=" + document.getElementById('emp_cate').value+ "&";
	getstr += "emp_status" + "=" + document.getElementById('emp_status').value+ "&";
	getstr += "date_of_join" + "=" + document.getElementById('date_of_join').value+ "&";
	getstr += "blood_group" + "=" + document.getElementById('blood_group').value+ "&";
	getstr += "email" + "=" + document.getElementById('email').value+ "&";
	getstr += "mobile_no" + "=" + document.getElementById('mobile_no').value+ "&";
	getstr += "bank_accno" + "=" + document.getElementById('bank_accno').value+ "&";
	getstr += "fname" + "=" + document.getElementById('fname').value+ "&";
	getstr += "mname" + "=" + document.getElementById('mname').value;
	
	Apost_office='div_view_empinfo';
	var url = "QueryNav.php";
	//alert(getstr);
	makeRequest(url, getstr);	
	}
	
function editSavedata(obj){
	var getstr = "?";
	getstr += "id" + "=" + 12 + "&";
	getstr += "employee_id" + "=" + document.getElementById('employee_id').value + "&";
	getstr += "empcode" + "=" + document.getElementById('empcode').value + "&";
	getstr += "username" + "=" + document.getElementById('username').value + "&";
	getstr += "Department" + "=" + document.getElementById('Department').value + "&";
	getstr += "Designation" + "=" + document.getElementById('Designation').value + "&";
	getstr += "Line" + "=" + document.getElementById('Line').value;
	
	Apost_office='div_view_empinfo';
	var url = "QueryNav.php";
	//alert(getstr);
	makeRequest(url, getstr);
	
	
	}

function AddUpdateDoc(obj_id){
	var url = "pre_upload.php";
	var getstr = "?";
	getstr += "id" + "=" + my + "&"; 
	getstr += "obj_id" + "=" + obj_id; 
	Apost_office = "post_office";
	makeRequest(url, getstr);
	}

function emplist(uid){
	var getstr = "?";
	getstr += "id" + "=" + uid + "&";
	getstr += "DeptID" + "=" + document.getElementById('Department').value;
	Apost_office='div_emplist';
	var url = "emplist.php";
	makeRequest(url, getstr);
	}
	
function SetFileTravel(uid){
	var getstr="?";
	getstr +="id" + "=" +uid;
	var url = "TravelUserList.php";
	makeRequest(url, getstr);
	
	}

function showMyChoices(id) {
  var strChoices = "";
  
  var objCBarray = document.getElementById('myform')['EmpChked[]'];
  for (i = 0; i < objCBarray.length; i++) {
    if (objCBarray[i].checked) {
      strChoices += objCBarray[i].value + ",";
    }
  }

  
  var objCBarray = document.getElementById('myform')['EmpChkTo[]'];
  for (i = 0; i < objCBarray.length; i++) {
    if (objCBarray[i].checked) {
      strChoices += objCBarray[i].value + ",";
    }
  }

  
  if (strChoices.length > 0) {
	//alert(strChoices.length);
	var str=strChoices.substr(0, strChoices.length-1) ;
	
	var getstr = "?";
	getstr += "id" + "=" + 8 + "&";
	getstr += "uid" + "=" + id + "&";
	getstr += "str" + "=" + str;

    Apost_office='DivTravelMsg';
	var url = "QueryNav.php";
	makeRequest(url, getstr);
  } else {
    alert("Please choose list.");
  }
}

function AddDept(obj){
	var getstr = "?";
	getstr += "id" + "=" + 9 + "&";
	getstr += "DeptName" + "=" + document.getElementById('edtDept').value;
	Apost_office='divDept';
	var url = "QueryNav.php";
	makeRequest(url, getstr);
	}

function AddDesignation(obj){
	var getstr = "?";
	getstr += "id" + "=" + 10 + "&";
	getstr += "DesigName" + "=" + document.getElementById('edtDesignation').value;
	//alert(getstr);
	Apost_office='divDesignation';
	var url = "QueryNav.php";
	makeRequest(url, getstr);
	}

 function editEmpInfo(emp_id,varempcode,varempname,dept_id,desig_id,line_id){
	//alert('ok');
	document.getElementById('employee_id').value=emp_id;
	document.getElementById('empcode').value=varempcode;
	document.getElementById('username').value=varempname;
	document.getElementById('Department').value=dept_id;
	document.getElementById('Designation').value=desig_id;
	document.getElementById('Line').value=line_id;
	return false; 

	}
	
function fileUpload(obj){
   
    var getstr = "?";
	getstr += "sub_id" + "=" + document.getElementById('subject_id').value;
	//alert(getstr);

	Apost_office='uploading_file';
	var url = "upload.php";
	makeRequest(url, getstr);
}
   
 function OpenInNewTab(emp_id,file_id) {
    
  var getstr="?";
  getstr += "emp_id" + "=" + emp_id + "&";
  getstr += "file_id" + "=" + file_id;
    
  var url="file_browse.php";
  var win = window.open(url+getstr, '_blank');
  win.focus();
} 


 function OpenNewTabTask(taskid,job_id) {
    
  var getstr="?";
  getstr += "taskid" + "=" + taskid +"&";
  getstr += "jobid" + "=" + job_id;
  
  if (my==1){
  var url="main_task_browser.php";}
  else if (my==2){
  var url="task_browse.php";}
  //alert(url+getstr)  ;
  var win = window.open(url+getstr, '_blank');
  win.focus();
} 

function loadfile(emp_id){
	   //alert('loadfile');
    var getstr="?";
    getstr += "emp_id" + "=" + emp_id; 

	Apost_office='viw_details';
	var url = "file_up.php";
	//alert(url);
	//makeRequest(url, getstr);
	
	var width = 400;
    var height = 600;
    var left = parseInt((screen.availWidth/2) - (width/2));
    var top = parseInt((screen.availHeight/2) - (height/2));
    var windowFeatures = "width=" + width + ",height=" + height + ",status,resizable,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top + ",scrollbars=yes";
    window.open(url+getstr, "subWind", windowFeatures, "POS");
	 
}
   

 function jobcheckAgain(emp_id){
	if (confirm('Are you sure you want to save this thing into the database?')) {
    // Save it!
	 var getstr = "?";
	getstr += "id" + "=" + 15 + "&";
    getstr += "emp_id" + "=" + emp_id; 
	//getstr += "new_id" + "=" + new_id;
    //alert(getstr);
	Apost_office='div_view_empinfo';
	var url = "QueryNav.php";
	
	makeRequest(url, getstr);
	}
}  
   

function getPgNameNew(new_id) {
	//alert(status);
	var getstr = "?";
	getstr += "new_id" + "=" + new_id;
	//alert(getstr);
	
	var url = "file_upload.php"; // URL for server-side PHP script

	Apost_office = "post_office";
	
	makeRequest(url, getstr);
}

function onDeptChange(){
	if (document.getElementById('Department').value != '')
	{
	var getstr = "?";
	getstr += "id" + "=" + 21 + "&";
	getstr += "dept_id" + "=" + document.getElementById('Department').value;
	Apost_office = "srcUserName";
	var url = "dept_user_onchange.php";
	makeRequest(url, getstr);
	}
}


function AddNote(user_id){
	var getstr = "?";
	getstr += "id" + "=" + 20 + "&";
	getstr += "user_id" + "=" + user_id + "&";
	getstr += "edtnote" + "=" + document.getElementById('edtnote').value;
	//alert(getstr);
	Apost_office='divnote';
	var url = "QueryNav.php";
	makeRequest(url, getstr);
	}

function overlay() {
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}



   
   