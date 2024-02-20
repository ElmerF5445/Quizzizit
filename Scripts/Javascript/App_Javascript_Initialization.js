/*
    Properties, starting functions, etc.
*/

/* App Information */
let App_Info = {
    // Title of the project
    Title: "Quizzizit!",
    // Title of the project's version
    Version_Title: "BETA 1.0",
    // Version number
    Version_Number: "1.0",
    // Latest compilation date of the project
    Version_CompilationDate: "16 February 2024",
    // Copyright text that appears in certain menu and screen elements
    Copyright_Title: "Content By ElmerF 2024",
    // Content By ElmerF logo
    Copyright_Icon: "Assets/Icons/favicon.png"
}

/* App Properties */
let App_Property = {
    // Title of the page that will appear in the menu and browser window
    Page_Title: "Template",
    // Icon that will appear on the tab favicon and other menu elements
    Page_Icon: "Assets/Icons/favicon.png",
    // 
    Page_Style: 0,
    // If set to true, the sidebar will disappear on the side when collapsed
    Sidebar_HideWhenCollapsed: false,
    // If set to true, the sidebar will push MainContent when expanded
    Sidebar_PushContentWhenExpanded: false,
    // The sidebar's width in pixels when expanded
    Sidebar_Width_Expanded: 300,
    // The sidebar's width in pixels when collapsed
    Sidebar_Width_Collapsed: 40,
    // Use the sidebar for tabs
    Sidebar_UseTabs: true,
    // If set to true, the Content container will occupy the full space of the MainContent container
    UseFullContainer: false,
    // If set to true, the loading screen will cover the screen until the page is fully loaded
    LoadingScreen_Enabled: true,
    // Style of the LoadingScreen: 0 - Black screen, 1 - Simple, 2 - Splash screen; 3 - Custom screen
    LoadingScreen_Style: 1,
    // If set to true, the Header will occupy space on the top
    Pin_Header: true,
    // If set to true, the Ribbon will occupy space below the Header
    Pin_Ribbon: true,
    // If set to true, the Sidebar will occupy space on the side
    Pin_Sidebar: true,
}

/* Hide elements */
// Array of element IDs that will be hidden during page load.
// This can be used to disable features
let App_HideElements = [];

/* Page navigation */
// Arrays of titles, IDs, and icons for the page navigation menu
let App_PageNavigation_Titles = ["Home"];
let App_PageNavigation_Links = ["Pages/QI_Home.html"];
let App_PageNavigation_Icons = ["Assets/Icons/icon_home.png"];

var path = window.location.pathname;
var App_CurrentPageName = path.split("/").pop();

window.onload = Startup_Check_Session();

var App_FirstSessionLoad = false;

function Startup_Check_Session(){
    if (sessionStorage.getItem("ABE_FirstSessionLoad") === null) {
		console.log("Session key does not exist");
		sessionStorage.setItem("ABE_FirstSessionLoad", "yes");
		console.log("Added session key");	
        App_FirstSessionLoad = true;
    }
    Startup_Page_ChangeConfigurations();
}

function Startup_Page_ChangeConfigurations(){
    switch(App_CurrentPageName){
        case "App_Template.html":
            App_Property.Page_Title = "Template Page";
            App_Property.LoadingScreen_Style = 2;
            // App_Property.Sidebar_PushContentWhenExpanded = true;
            // App_Property.Sidebar_HideWhenCollapsed = true;
            // App_Property.UseFullContainer = true;
            App_HideElements = [];
        break;
        case "QI_Home.html":
            App_Property.Page_Title = "Home";
            App_Property.Page_Icon = "Assets/Icons/Quizzizit_Logo_Square.png";
            App_Property.LoadingScreen_Style = 3;
            App_Property.Sidebar_UseTabs = false;
            App_HideElements = ["Header_SidebarToggle", "Header", "Ribbon", "Sidebar"];
        break;
        case "QI_Quiz_Create.html":
            App_Property.Page_Title = "Quiz Builder";
            App_Property.Page_Icon = "Assets/Icons/Quizzizit_Logo_Square.png";
            App_Property.LoadingScreen_Style = 3;
            App_Property.Sidebar_UseTabs = true;
            App_Property.Sidebar_HideWhenCollapsed = true;
            App_Property.Sidebar_PushContentWhenExpanded = true;
            App_HideElements = [];
        break;
    }
    Startup_Page_ApplyConfigurations();
}

function Startup_Page_ApplyConfigurations(){
    if (App_Property.LoadingScreen_Style == 0){
        document.getElementById("LoadingScreen_Simple").setAttribute("Display", "none");
        document.getElementById("LoadingScreen_Splash").setAttribute("Display", "none");
        document.getElementById("LoadingScreen_Custom").setAttribute("Display", "none");
    } else if (App_Property.LoadingScreen_Style == 1){
        document.getElementById("LoadingScreen_Simple").setAttribute("Display", "grid");
        document.getElementById("LoadingScreen_Splash").setAttribute("Display", "none");
        document.getElementById("LoadingScreen_Custom").setAttribute("Display", "none");
    } else if (App_Property.LoadingScreen_Style == 2){
        document.getElementById("LoadingScreen_Simple").setAttribute("Display", "none");
        document.getElementById("LoadingScreen_Splash").setAttribute("Display", "grid");
        document.getElementById("LoadingScreen_Custom").setAttribute("Display", "none");
    } else if (App_Property.LoadingScreen_Style == 3){
        document.getElementById("LoadingScreen_Simple").setAttribute("Display", "none");
        document.getElementById("LoadingScreen_Splash").setAttribute("Display", "none");
        document.getElementById("LoadingScreen_Custom").setAttribute("Display", "grid");
    }

    if (document.getElementById("Sidebar").style.display != "none" && document.getElementById("Sidebar").classList.contains("Tabs_Vertical_Container_Selector") == true){
        Tabs_DisplayFirstPage();
    }

    if (App_Property.LoadingScreen_Enabled == false){
        document.getElementById("LoadingScreen").setAttribute("Display", "none");
    } else {
        document.getElementById("LoadingScreen").setAttribute("Display", "block");
    }

    if (App_Property.UseFullContainer == true){
        Element_Attribute_Set("Content", "Style_Margin", "Disabled");
    }

    var stylesheet = document.querySelector(':root');
	stylesheet.style.setProperty("--Sidebar-Width-Expanded", App_Property.Sidebar_Width_Expanded + "px");
    stylesheet.style.setProperty("--Sidebar-Width-Collapsed", App_Property.Sidebar_Width_Collapsed + "px");

    for (a = 0; a < App_PageNavigation_Titles.length; a++){
        var App_PageNavigation_Element_Anchor = document.createElement('a');
        App_PageNavigation_Element_Anchor.href = App_PageNavigation_Links[a];
        App_PageNavigation_Element_Anchor.setAttribute("id", "Header_PageNavigation_Menu_Link_" + a);
        document.getElementById("Header_PageNavigation_Menu_Links").appendChild(App_PageNavigation_Element_Anchor);

        var App_PageNavigation_Element_Div = document.createElement('div');
        App_PageNavigation_Element_Div.className = "Header_PageNavigation_Menu_Button_Item";
        App_PageNavigation_Element_Div.setAttribute("id", "Header_PageNavigation_Menu_Link_Div_" + a);
        document.getElementById("Header_PageNavigation_Menu_Link_" + a).appendChild(App_PageNavigation_Element_Div);

        var App_PageNavigation_Element_Icon = document.createElement('img');
        App_PageNavigation_Element_Icon.className = "Header_PageNavigation_Menu_Button_Item_Icon";
        App_PageNavigation_Element_Icon.setAttribute("draggable", "false");
        App_PageNavigation_Element_Icon.setAttribute("loading", "lazy");
        App_PageNavigation_Element_Icon.src = App_PageNavigation_Icons[a];
        document.getElementById("Header_PageNavigation_Menu_Link_Div_" + a).appendChild(App_PageNavigation_Element_Icon);

        var App_PageNavigation_Element_Title = document.createElement('p');
        App_PageNavigation_Element_Title.className = "Header_PageNavigation_Menu_Button_Item_Text";
        App_PageNavigation_Element_Title.innerHTML = App_PageNavigation_Titles[a];
        document.getElementById("Header_PageNavigation_Menu_Link_Div_" + a).appendChild(App_PageNavigation_Element_Title);
    }
    Startup_Page_ApplyInformation();
}

function Startup_Page_ApplyInformation(){
    if (App_Property.LoadingScreen_Enabled == true){
        if (App_Property.LoadingScreen_Style == 1){
            document.getElementById("LoadingScreen_Icon_Simple").src = App_Property.Page_Icon;
            document.getElementById("LoadingScreen_Title_Simple").innerHTML = App_Info.Title;
            document.getElementById("LoadingScreen_Subtitle_Simple").innerHTML = App_Property.Page_Title;
            document.getElementById("LoadingScreen_Copyright_Icon_Simple").src = App_Info.Copyright_Icon;
            document.getElementById("LoadingScreen_Copyright_Title_Simple").innerHTML = App_Info.Copyright_Title;
        } else if (App_Property.LoadingScreen_Style == 2){
            document.getElementById("LoadingScreen_Icon_Splash").src = App_Property.Page_Icon;
            document.getElementById("LoadingScreen_Title_Splash").innerHTML = App_Info.Title;
            document.getElementById("LoadingScreen_Subtitle_Splash").innerHTML = App_Property.Page_Title;
            document.getElementById("LoadingScreen_Copyright_Icon_Splash").src = App_Info.Copyright_Icon;
            document.getElementById("LoadingScreen_Copyright_Title_Splash").innerHTML = App_Info.Copyright_Title;
        }
    }

    document.getElementById("Page_Favicon").src = App_Property.Page_Icon;
    document.getElementById("Page_Title").innerText = App_Info.Title + " | " + App_Property.Page_Title;
    document.getElementById("Header_PageNavigation_Menu_Title").innerHTML = App_Property.Page_Title;
    document.getElementById("Header_PageNavigation_Icon").src = App_Property.Page_Icon;
    document.getElementById("Header_PageNavigation_Title").innerHTML = App_Property.Page_Title;

    Startup_Page_HideElements();
}

function Startup_Page_HideElements(){
    if (App_HideElements.length > 0){
        for (a = 0; a < App_HideElements.length; a++){
            document.getElementById(App_HideElements[a]).setAttribute("Display", "none");
            document.getElementById(App_HideElements[a]).setAttribute("UI_Status", "Disabled");
        }
    }
    Startup_Page_AdditionalFunctions();
}

function Startup_Page_AdditionalFunctions(){
    // Specify any additional functions that will be executed on page load here
    if (Element_Attribute_Get("Header_StatusTray_Clock", "UI_Status") != "Disabled" || Element_Attribute_Get("ClockScreen", "UI_Status") != "Disabled"){
        Clock_Update_Time();
        Date_Update_Date();
    }
    if (Element_Attribute_Get("Header_StatusTray_Battery", "UI_Status") != "Disabled" || Element_Attribute_Get("ClockScreen", "UI_Status") != "Disabled"){
        Battery_Update_Level();
    }
    if (Element_Attribute_Get("Header_StatusTray_Extras_InternetStatus", "UI_Status") != "Disabled" || Element_Attribute_Get("ClockScreen", "UI_Status") != "Disabled"){
        Connection_Update_Status();
    }

    if (Element_Attribute_Get("Header", "UI_Status") == "Disabled"){
        Element_Attribute_Set("MainContent", "Style_Margin_Header", "Disabled");
        // Element_Attribute_Set("Sidebar", "Style_Margin_Header", "Enabled");
    }
    
    if (Element_Attribute_Get("Sidebar", "UI_Status") == "Disabled"){
        Element_Attribute_Set("MainContent", "Style_Margin_Sidebar", "Disabled");
        Element_Attribute_Set("Header", "Style_Margin_Sidebar", "Disabled");
        Element_Attribute_Set("Ribbon", "Style_Margin_Sidebar", "Disabled");
    }
    if (Element_Attribute_Get("Header_SidebarToggle", "UI_Status") == "Disabled"){
        Element_Attribute_Set("Sidebar", "Style_Margin_Header", "Disabled");
        Element_Attribute_Set("Header", "Style_Margin_SidebarToggle", "Disabled");
        // Element_Attribute_Set("Sidebar", "Style_Margin_Header", "Enabled");
    }
    if (Element_Attribute_Get("Ribbon", "UI_Status") == "Disabled"){
        Element_Attribute_Set("MainContent", "Style_Margin_Ribbon", "Disabled");
    } else {
        Element_Attribute_Set("MainContent", "Style_Margin_Ribbon", "Enabled");
		pageProperty_enableRibbon = 1;
    }
    if (App_Property.Sidebar_HideWhenCollapsed == true){
        Element_Attribute_Set("MainContent", "Style_Margin_Sidebar", "Disabled");
        Element_Attribute_Set("Ribbon", "Style_Margin_Sidebar", "Disabled");
        Element_Attribute_Set("Sidebar", "State", "Collapsed_Hide");
    } else {
        Element_Attribute_Set("MainContent", "Style_Margin_Sidebar", "Enabled");
        Element_Attribute_Set("Ribbon", "Style_Margin_Sidebar", "Enabled");
        Element_Attribute_Set("Sidebar", "State", "Collapsed");
    }
    Startup_Page_FinishInitialization();
}

function Startup_Page_FinishInitialization(){
    console.log(App_Info.Title + " " + App_Info.Version_Title + " | " + App_Info.Copyright_Title);
    setTimeout(LoadingScreen_Hide, 3000);
}