import { useState } from "react";
import FullCalender from '@fullcalendar/react';
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
 
const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);

    const handleDataClick = (selected) => {
        const title = prompt("Please enter a new title for your event")
        const calenderApi = selected.view.calendar;
        calenderApi.unselect();

        if(title){
            calenderApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr, 
                end: selected.endStr,
                allDay: selected.allDay
            });
        }
    }

    const handleEventClick = (selected) => {
        if(window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)){
            selected.event.remove();
        }
    }
    return (
        <Box m="20px">
            <Header title="CALENDAR" subtitle="Manage Your Schedule" />

            <Box display="flex" justifyContent="space-between">
                {/* Calendar Sidebar */}
                <Box flex="1 1 20%" backgroundColor={colors.primary[400]} borderRadius="4px" p="15px">
                    <Typography variant="h5">Events</Typography>
                    <List>
                        {currentEvents.map((event) => (
                            <ListItem key={event.id}
                                    sx={{backgroundColor: colors.greenAccent[500], borderRadius: "2px", margin: "10px 0"}}
                            >
                                <ListItemText 
                                    primary={event.title} 
                                    secondary={
                                        <Typography>
                                            {formatDate(event.start, {
                                                year: 'numeric', 
                                                month: 'short', 
                                                day: 'numeric'
                                            })}
                                        </Typography>
                                    } 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {/* Calendar */}
                <Box flex="1 1 100%" ml="15px">
                    <FullCalender
                        height="75vh"
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin
                        ]}
                        headerToolbar={{
                            left: "prev,next today",
                            center:"title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDataClick}
                        eventClick={handleEventClick}
                        eventsSet={(events)=> setCurrentEvents(events)}
                        initialEvents={[
                            {id:"1234", title: "All-day event", date: "2025-03-27"},
                            {id:"1234", title: "Timed event", date: "2025-03-14"}
                        ]}
                    />

                </Box>
            </Box>
        </Box>
    )
}

export default Calendar;