let content_array = [0,0,0,0,0,0,0,0,0]

function setNotification(file_link, form) {
    $.when(importNotificationCss(file_link))
    .done(() => {
        const item = getRenderNotification()
        if(form == "" || form == null) {
            $("body").append(item)
        }
        else {
            $("#" + form).append(item)
        }
    })
}

function getRenderNotification() {
    const render = `<div class = "notification-div" label = "notification"></div>`

    return render
}

function importNotificationCss(file_link) {
    // Get HTML head element
    const head = document.getElementsByTagName('HEAD')[0]

    // Create new link Element
    const link = document.createElement('link')

    // set the attributes for link element 
    link.rel = 'stylesheet'
  
    link.type = 'text/css'
  
    link.href = file_link + '/notification-too/notification-too.css'

    // Append link element to HTML head
    head.appendChild(link)
}

function showNotification(data, type, time = 2000, show = "slow", hide = "slow") {
    const checkedType = checkNotificationType(type)
    const checkedData = checkNotificationData(data, checkedType.type)
    const checkedTime = checkNotificationTime(time)

    const notification_slot = getNotificationSlot()
    
    if(notification_slot.type == "successful") {
        $(".notification-div").append("<button class = 'notification-content-" + notification_slot.data + "' id = 'notification-content-" + notification_slot.data + "'>Sample</button>")
        $("#notification-content-" + notification_slot.data).attr("class", "notification-content-" +  + notification_slot.data + " " + checkedType.type)
        $(".notification-content-" + notification_slot.data).fadeIn(show)
        $("#notification-content-" + notification_slot.data).html(checkedData.data)
        setTimeout(function() {
            $.when($(".notification-content-" + notification_slot.data).fadeOut(hide))
            .done(() => {
                $("#notification-content-" + notification_slot.data).remove()
                unsetNotifcation(notification_slot.data)
            })
        }, checkedTime.time)
    }
    else {
        setTimeout(function() {
            showNotification(data, type, time, show, hide)
        }, 500)
    }
}

function checkNotificationData(data, type) {
    if(data == "" || data == null) {
        if(type == "success") {
            data = "Success!"
        }
        else if(type == "warning") {
            data = "Warning!"
        }
        else {
            data = "Error!"
        }
    }

    return {
        data: data
    }
}

function checkNotificationType(type) {
    if(type == "" || type == null) {
        type = "default"
    }

    return {
        type: type
    }
}

function checkNotificationTime(time) {
    if(time == "" || time == null) {
        time = 2000
    }

    return {
        time: time
    }
}

function getNotificationSlot() {
    let content_array_index = 0
    let flag = false

    if(content_array[0] == 1) {
        for(let index in content_array) {
            if(content_array[index] == 0) {
                content_array[index] = 1
                content_array_index = parseFloat(index) + 1
                flag = true
                break
            }
        }
    }
    else {
        flag = true
        content_array[0] = 1
        content_array_index = 1
    }

    if(flag) {
        return {
            type: "successful",
            data: content_array_index
        }
    }
    else {
        return {
            type: "error",
            data: "no slot"
        }
    }
}

function unsetNotifcation(index) {
    content_array[index - 1] = 0
}