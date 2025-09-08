import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useServiceStore } from '../../../stores/serviceStore';
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium, SpaceXXXLarge } from '../../../components/Space';
import './EventDetailPage.css';

const EventDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getEventDetail } = useServiceStore();
    const [event, setEvent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEventDetail = async () => {
            if (!id) {
                navigate('/events');
                return;
            }
            try {
                setIsLoading(true);
                const eventData = await getEventDetail(parseInt(id));
                if (eventData) {
                    setEvent(eventData);
                } else {
                    navigate('/events');
                }
            } catch (error) {
                console.error('Failed to fetch event detail:', error);
                navigate('/events');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventDetail();
    }, [id, getEventDetail, navigate]);

    if (isLoading) {
        return (
            <div style={{ width: '100%' }}>
                <SpaceMedium />
                <div>로딩 중...</div>
                <SpaceXXXLarge />
            </div>
        );
    }

    if (!event) {
        return (
            <div style={{ width: '100%' }}>
                <SpaceMedium />
                <div>이벤트를 찾을 수 없습니다.</div>
                <SpaceXXXLarge />
            </div>
        );
    }

    const isExpired = new Date(event.end_date) <= new Date();

    return (
        <div style={{ width: '100%' }} className={"event-detail-page"}>
            <SpaceMedium />
            <MainTitle>{event.title}</MainTitle>
            <SubTitle>{new Date(event.start_date).toLocaleDateString('ko-KR')} ~ {new Date(event.end_date).toLocaleDateString('ko-KR')}</SubTitle>
            
            <SpaceMedium />
            {event.detail_img && (
                <div className="event-detail-page-image">
                    <img 
                        src={event.detail_img} 
                        alt={event.title}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
            )}
            <SpaceMedium />
            {event.description && (
                <div className="event-detail-page-description">
                    {event.description}
                </div>
            )}
            <SpaceXXXLarge />
            {event.link && (
                <div className="event-detail-page-link">
                    {!isExpired ? (
                        <button onClick={() => window.open(event.link, '_blank')}>
                            참여하기
                        </button>
                    ) : (
                        <button disabled>
                            마감
                        </button>
                    )}
                </div>
            )}
            <SpaceXXXLarge />

            <SpaceMedium />
        </div>
    );
};

export default EventDetailPage;
