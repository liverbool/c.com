Ext.define 'Magice.Cloud.view.server.Locale',
    locale:
        reqiurePowerOff:
            title: 'Oops!'
            message: 'To take this action please poweroff your server (%s) from the command line.'
        powerCurrentlyOff:
            title: 'Oops!'
            message: 'Machine is currently off. Please power it on to run this event.'
        powerCurrentlyOn:
            title: 'Oops!'
            message: 'Machine is currently on. Please power it off to run this event.'
        syncError:
            title: "Warning!"
            message: "An error on your server infomation <b>(%s)</b>. You should be reload your browser."
        stepInvalid:
            title: 'No step completed!'
            message: 'You must select all required options.'
        emptyRecord:
            title: 'Oops!'
            message: 'You must select once of servers.'
        rename:
            confirm:
                title: 'Confirmation!'
                message: 'You have changed your hostname. Do you want to save?'
            notValid:
                title: 'Oops!'
                message: 'Your hostname is not valid in term of Domain Name format.'
            notDirty:
                title: 'Alert'
                message: 'Nothing change.'
        rebuild:
            noSelectedImage:
                title: 'Oops!'
                message: 'You have no select any image.'
        snapshot:
            notValid:
                title: 'Oops!'
                message: 'Your snapshot name is not valid.'
        snapshotlist:
            noSelection:
                title: 'Oops!'
                message: "Cannot destroy empty record. You may lost snapshot's selection."
            renameError:
                title: 'Oops!'
                message: 'Unable to update your snapshot name.'
            updating: 'Updating...'
            destoryTitle: 'Destroy snapshot image.'
            restoreTitle: 'Restore from snapshot image.'
        backuplist:
            noSelection:
                title: 'Oops!'
                message: "Cannot destroy empty record. You may lost backup's selection."
            renameError:
                title: 'Oops!'
                message: 'Unable to update your backup name.'
            updating: 'Updating...'
            destoryTitle: 'Destroy backup image.'
            restoreTitle: 'Restore from backup image.'
