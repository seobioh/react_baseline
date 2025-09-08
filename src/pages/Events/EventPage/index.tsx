import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium, SpaceXXXLarge } from '../../../components/Space';
import EventTile from '../../../components/Tiles/EventTile';
import { useServiceStore } from '../../../stores/serviceStore';
import './EventPage.css';

const EventPage: React.FC = () => {
    const navigate = useNavigate();
    const { events, getEvents, isLoading } = useServiceStore();

    useEffect(() => {
        getEvents();
    }, []);

    const { activeEvents, completedEvents } = useMemo(() => {
        const now = new Date();
        const active: any[] = [];
        const completed: any[] = [];

            events
                .filter(event => event.is_active)
                .forEach(event => {
                    const endDate = new Date(event.end_date);
                    const isExpired = endDate <= now;
                    const eventData = {
                        imageDesktop: event.desktop_img || event.mobile_img || '',
                        imageMobile: event.mobile_img || event.desktop_img || '',
                        isClickable: true,
                        isExpired: isExpired,
                        onClick: () => navigate(`/events/${event.id}`)
                    };

                    if (endDate > now) {
                        active.push(eventData);
                    } else {
                        completed.push(eventData);
                    }
                });

        return { activeEvents: active, completedEvents: completed };
    }, [events, navigate]);

    return (
        <div style={{width: '100%'}} className="event-page">
            <SpaceMedium />
            <MainTitle> 진행중인 이벤트 </MainTitle>
            <SubTitle> 진행중인 이벤트를 확인해보세요. </SubTitle> 

            <SpaceMedium />
            {isLoading ? (
                <div className="event-page-tile-list-empty">로딩 중...</div>
            ) : activeEvents.length > 0 ? (
                <EventTile events={activeEvents} />
            ) : (
                <div className="event-page-tile-list-empty">
                    진행중인 이벤트가 없습니다.
                </div>
            )}
            <SpaceXXXLarge />

            <SpaceMedium />
            <MainTitle> 종료된 이벤트 </MainTitle>
            <SubTitle> 이전에 진행된 이벤트를 확인해보세요. </SubTitle> 

            <SpaceMedium />
            {isLoading ? (
                <div className="event-page-tile-list-empty">로딩 중...</div>
            ) : completedEvents.length > 0 ? (
                <EventTile events={completedEvents} />
            ) : (
                <div className="event-page-tile-list-empty">
                    종료된 이벤트가 없습니다.
                </div>
            )}
            <SpaceXXXLarge />


            <SpaceMedium />
        </div>
      )
    };

export default EventPage;