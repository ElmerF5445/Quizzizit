function QIQB_ChangeContainerProperty(Property){
    App_Property.UseFullContainer = Property;
    Startup_Page_ApplyConfigurations();
}

var QIQB_isFirstLoad = true;

function QIQB_Submit_BasicInformation(){
    if (document.getElementById("BI_Quiz_Title").value != ""){
        App_Property.Sidebar_HideWhenCollapsed = false;
        // App_Property.UseFullContainer = true;
        Startup_Page_ApplyConfigurations();
        Sidebar_Toggle();
        if (Element_Attribute_Get('Sidebar', 'State') == "Expanded"){
            Sidebar_Toggle();
        }
        Tabs_ChangeTab_Specific(1, 'Sidebar'); 
        document.getElementById("Header_PageNavigation_Title").innerHTML = document.getElementById("BI_Quiz_Title").value; 
    } else {
        Subwindows_Open("QIQB_Error_NoQuizTitle");
    }
    if (QIQB_isFirstLoad == true){
        QIQB_Question_Add();
    }
}

var QIQB_Question_Count = 0;
var QIQB_QuizItem_Number;
function QIQB_Question_Add(){
    QIQB_Question_SaveProgress();
    QIQB_Question_Count++;
    QIQB_QuizItem_Number = QIQB_Question_Count;
    const QIQB_QuizItem_HTML = `
        <div class="QIQB_QuizItem" id="${QIQB_QuizItem_Number}">
            <div class="QIQB_QuizItem_Controls">
                <p class="Input_Label General_Title QIQB_QuizItem_Number" for="BI_Quiz_Title">
                    Question #${QIQB_QuizItem_Number}: 
                </p>
                <img class='QIQB_QuizItem_Controls_Icon' src='Assets/Icons/iconNew_delete.png' draggable='false' loading='lazy' onclick="QIQB_Question_Delete_Confirm(${QIQB_QuizItem_Number})"/>
            </div>

            <textarea type="text" class="Input_Text QIQB_QuizItem_Question" id="QIQB_QuizItem_Question_${QIQB_QuizItem_Number}" autocomplete="off" placeholder="Question"></textarea>

            <div class="Radio" id="QIQB_QuizItem_Choices_${QIQB_QuizItem_Number}" Radio_ActiveButton="">
                <div class="Radio_Button" id="QIQB_QuizItem_Choices_${QIQB_QuizItem_Number}_1" onclick="Radio_Select(this.id)" State="Inactive">
                    <div class="Radio_Button_Indicator"></div>
                    <input type="text" class="Input_Text" placeholder="Choice 1"/>
                </div>
                <div class="Radio_Button" id="QIQB_QuizItem_Choices_${QIQB_QuizItem_Number}_2" onclick="Radio_Select(this.id)" State="Inactive">
                    <div class="Radio_Button_Indicator"></div>
                    <input type="text" class="Input_Text" placeholder="Choice 2"/>
                </div>
                <div class="Radio_Button" id="QIQB_QuizItem_Choices_${QIQB_QuizItem_Number}_3" onclick="Radio_Select(this.id)" State="Inactive">
                    <div class="Radio_Button_Indicator"></div>
                    <input type="text" class="Input_Text" placeholder="Choice 3"/>
                </div>
                <div class="Radio_Button" id="QIQB_QuizItem_Choices_${QIQB_QuizItem_Number}_4" onclick="Radio_Select(this.id)" State="Inactive">
                    <div class="Radio_Button_Indicator"></div>
                    <input type="text" class="Input_Text" placeholder="Choice 4"/>
                </div>
            </div>
        </div>
    `;
    var QIQB_QuizItem = document.createElement('div');
    QIQB_QuizItem.innerHTML = QIQB_QuizItem_HTML;
    document.getElementById("QIQB_Quiz").appendChild(QIQB_QuizItem);
}

function QIQB_Question_Delete_Confirm(ItemNumber){
    Subwindows_Open('QIQB_ConfirmQuestionDeletion');
}

var QIQB_QuizItem_Data_ID;
var QIQB_QuizItem_Data_Question;
var QIQB_QuizItem_Data_Choices = [];
var QIQB_QuizItem_Data_Answer;
var QIQB_QuizItem_Data_Answer_Explanation;
var QIQB_Quiz_Questions_Data = [];
var QIQB_Quiz_BasicInformation_Data = [];
var QIQB_Quiz_BasicInformation_Data_Title;
var QIQB_Quiz_BasicInformation_Data_Description;
var QIQB_Quiz_BasicInformation_Data_Author;
var QIQB_Quiz_BasicInformation_Data_Resources;
var QIQB_Quiz_Data = {
    BasicInformation: QIQB_Quiz_BasicInformation_Data,
    Questions: QIQB_Quiz_Questions_Data
}

function QIQB_Question_SaveProgress(){
    QIQB_Quiz_Data = [];
    for (a = 1; a <= QIQB_Question_Count; a++){
        QIQB_QuizItem_Data_ID = a;
        QIQB_QuizItem_Data_Question = document.getElementById("QIQB_QuizItem_Question_" + a).value;
        QIQB_QuizItem_Data_Choices = [
            document.getElementById("QIQB_QuizItem_Choices_" + a + "_1").querySelector(".Input_Text").value,
            document.getElementById("QIQB_QuizItem_Choices_" + a + "_2").querySelector(".Input_Text").value,
            document.getElementById("QIQB_QuizItem_Choices_" + a + "_3").querySelector(".Input_Text").value,
            document.getElementById("QIQB_QuizItem_Choices_" + a + "_4").querySelector(".Input_Text").value
        ];
        QIQB_QuizItem_Data_Answer = Element_Attribute_Get("QIQB_QuizItem_Choices_" + a, "Radio_ActiveButton").split("_").pop();
        QIQB_QuizItem_Data_Answer_Explanation = "Coming soon in a sari-sari store near you";
        var QIQB_QuizItem_Data = {
            ID: QIQB_QuizItem_Data_ID,
            Question: QIQB_QuizItem_Data_Question,
            Choices: QIQB_QuizItem_Data_Choices,
            Answer: QIQB_QuizItem_Data_Answer,
            Answer_Explanation: QIQB_QuizItem_Data_Answer_Explanation,
        };
        QIQB_Quiz_Questions_Data.push(QIQB_QuizItem_Data);
    }



    QIQB_Quiz_BasicInformation_Data = [];
    QIQB_Quiz_BasicInformation_Data_Title = document.getElementById("BI_Quiz_Title").value;
    QIQB_Quiz_BasicInformation_Data_Description = document.getElementById("BI_Quiz_Description").value;
    QIQB_Quiz_BasicInformation_Data_Author = document.getElementById("BI_Quiz_Author").value;
    QIQB_Quiz_BasicInformation_Data_Resources = "Coming soon in a sari-sari store near you";
    QIQB_Quiz_BasicInformation_Data = [QIQB_Quiz_BasicInformation_Data_Title, QIQB_Quiz_BasicInformation_Data_Description, QIQB_Quiz_BasicInformation_Data_Author, QIQB_Quiz_BasicInformation_Data_Resources];
    QIQB_Quiz_Data = {
        BasicInformation: QIQB_Quiz_BasicInformation_Data,
        Questions: QIQB_Quiz_Questions_Data
    }

    console.log("Quiz progress have been saved.");
}

function QIQB_Quiz_FormatData(){
    var QIQB_Quiz_FormatData_Format =  document.getElementById("QIQB_Quiz_Download_Dropdown_FileFormat").innerText;
    if (QIQB_Quiz_FormatData_Format == "Alex format"){
        var QIQB_Quiz_Data_AlexFormat = [];
        for (a = 1; a <= QIQB_Question_Count; a++){
            // QIQB_QuizItem_Data_ID = a;
            QIQB_QuizItem_Data_Question = document.getElementById("QIQB_QuizItem_Question_" + a).value;
            QIQB_QuizItem_Data_Choices = [
                document.getElementById("QIQB_QuizItem_Choices_" + a + "_1").querySelector(".Input_Text").value,
                document.getElementById("QIQB_QuizItem_Choices_" + a + "_2").querySelector(".Input_Text").value,
                document.getElementById("QIQB_QuizItem_Choices_" + a + "_3").querySelector(".Input_Text").value,
                document.getElementById("QIQB_QuizItem_Choices_" + a + "_4").querySelector(".Input_Text").value
            ];
            for (b = 0; b < QIQB_QuizItem_Data_Choices.length; b++){
                if(QIQB_QuizItem_Data_Choices[b] == null || QIQB_QuizItem_Data_Choices[b] == ""){
                    QIQB_QuizItem_Data_Choices.splice(b, 1);
                }
            }
            QIQB_QuizItem_Data_Answer = QIQB_QuizItem_Data_Choices[Element_Attribute_Get("QIQB_QuizItem_Choices_" + a, "Radio_ActiveButton").split("_").pop()];
            // QIQB_QuizItem_Data_Answer_Explanation = "Coming soon in a sari-sari store near you";
            var QIQB_QuizItem_Data = {
                // ID: QIQB_QuizItem_Data_ID,
                Question: QIQB_QuizItem_Data_Question,
                Choices: QIQB_QuizItem_Data_Choices,
                Answer: QIQB_QuizItem_Data_Answer,
                // Answer_Explanation: QIQB_QuizItem_Data_Answer_Explanation,
            };
            QIQB_Quiz_Data_AlexFormat.push(QIQB_QuizItem_Data);
        }
        QIQB_Quiz_Generate_Output(QIQB_Quiz_Data_AlexFormat);
    } else if (QIQB_Quiz_FormatData_Format == "Standard JSON"){
        QIQB_Question_SaveProgress();
        QIQB_Quiz_Generate_Output(QIQB_Quiz_Data);
    }
    console.log("Data formatting completed");
}

var QIQB_Quiz_Data_Output_JSON;
function QIQB_Quiz_Generate_Output(QuizData){
    QIQB_Quiz_Data_Output_JSON = JSON.stringify(QuizData, null, 4);
    document.getElementById("QIQB_Quiz_Data_Output").value = QIQB_Quiz_Data_Output_JSON;
    console.log("Pass data to output completed");
}

var QIQB_Quiz_Data_FileName;
var QIQB_Quiz_Data_FileType;
var QIQB_Quiz_Data_FileNameFull;

function QIQB_Quiz_DownloadFile(){
    QIQB_Quiz_FormatData();
    if (document.getElementById("QIQB_Quiz_Download_QuizTitle").value != "" || document.getElementById("QIQB_Quiz_Download_QuizTitle").value != null){
        Toasts_CreateToast("Assets/Icons/iconNew_download.png", "Downloading file...", "The file is being downloaded. This may take a few moments depending on the size of the quiz.");
        QIQB_Quiz_Data_FileName = document.getElementById("QIQB_Quiz_Download_QuizTitle").value;
        QIQB_Quiz_Data_FileType = document.getElementById("QIQB_Quiz_Download_Dropdown_FileType").innerText;
        if (QIQB_Quiz_Data_FileType == "Text file (.txt)"){
            QIQB_Quiz_Data_FileNameFull = QIQB_Quiz_Data_FileName + ".txt";
        } else if (QIQB_Quiz_Data_FileType == "JSON file (.json)"){
            QIQB_Quiz_Data_FileNameFull = QIQB_Quiz_Data_FileName + ".json";
        }
        saveTextAs(document.getElementById("QIQB_Quiz_Data_Output").value, QIQB_Quiz_Data_FileNameFull);
    } else {
        Subwindows_Open("QIQB_Error_NoFileName");
    }    
}

function QIQB_Quiz_CopyToClipboard(){
    // QIQB_Quiz_FormatData();
    navigator.clipboard.writeText(document.getElementById("QIQB_Quiz_Data_Output").value);
    Toasts_CreateToast("Assets/Icons/icon_changelog.png", "Copied to clipboard", "The output have been copied to your clipboard.");
}