function QIQB_ChangeContainerProperty(Property){
    App_Property.UseFullContainer = Property;
    Startup_Page_ApplyConfigurations();
}

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
    
}