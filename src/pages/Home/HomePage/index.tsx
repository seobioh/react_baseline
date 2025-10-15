import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useServiceStore } from '../../../stores/serviceStore';
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium, SpaceSmall, SpaceXXXLarge } from '../../../components/Space';
import AdTile from '../../../components/Tiles/AdTile';
import { DetailTile } from '../../../components/Tiles/DetailTile';
import sampleImage1 from '../../../assets/images/light/sample_img_1.png';
import sampleImage2 from '../../../assets/images/light/sample_img_2.png';
import sampleImage3 from '../../../assets/images/light/sample_img_3.png';
import './HomePage.css';


const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { ads, getAds, isLoading: adsLoading } = useServiceStore();

    useEffect(() => {
        getAds();
    }, []);

    return (
        <div className="home-page">
            {adsLoading ? (
                <div>로딩 중...</div>
            ) : ads.filter(ad => ad.is_active).length > 0 ? (
                <AdTile 
                    ads={ads
                        .filter(ad => ad.is_active)
                        .map(ad => ({
                            imageDesktop: ad.desktop_img || '',
                            imageMobile: ad.mobile_img || '',
                            backgroundImage: ad.background_img || "linear-gradient(#000, #000)",
                            onClick: () => {
                                if (ad.link) {
                                    window.location.href = ad.link;
                                } else {
                                }
                            },
                            isClickable: ad.link ? true : false,
                        }))
                    }
                />
            ) : null}
            <SpaceSmall />
            
            <div className="home-page-section">
                <SpaceMedium />
                <button className="home-page-search">차량 검색</button>
                <div className="home-page-space" />
                <SpaceMedium />
                <MainTitle> 신규 차량을 확인해 보세요. </MainTitle>
                <SubTitle> 이번 주에 새롭게 입고된 차량들을 확인해 보세요. </SubTitle>
                <SpaceSmall />
                <div className="home-page-tile-list">
                    <DetailTile product="488 GTB" brand="Ferrari"  image={sampleImage1} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="S600" brand="Mercedes-Benz" image={sampleImage2} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW"image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                </div>
                <SpaceXXXLarge />

                <MainTitle> 이런 차들은 어떠세요? </MainTitle>
                <SubTitle> 넘치는 매력으로 수요가 많은 차량이에요. </SubTitle>
                <SpaceSmall />
                <div className="home-page-tile-list">
                    <DetailTile product="488 GTB" brand="Ferrari" image={sampleImage1} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="S600" brand="Mercedes-Benz" image={sampleImage2} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                </div>
                <SpaceXXXLarge />

                <MainTitle> 곧 찾아오는 차량들 </MainTitle>
                <SubTitle> 수리비 걱정 없이 차량을 구독할 수 있어요! </SubTitle> 
                <SpaceSmall />
                <div className="home-page-tile-list">
                    <DetailTile product="488 GTB" brand="Ferrari" image={sampleImage1} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="S600" brand="Mercedes-Benz" image={sampleImage2} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile product="M4" brand="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                </div>
                <SpaceXXXLarge />

                <MainTitle> 더 많은 차량들이 궁금하신가요? </MainTitle>
                <SubTitle> 차고에서 많은 차량들을 확인해 보세요. </SubTitle>
                <SpaceSmall />
                <a href="/products">
                    <SubTitle style={{ color: 'black' }}> 차고 둘러보기 → </SubTitle>
                </a>
                <SpaceXXXLarge />

                <SpaceMedium />
            </div>
        </div>
      )
    };

export default HomePage;