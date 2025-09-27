import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useServiceStore } from '../../../stores/serviceStore';
import { MainTitle, SubTitle } from '../../../components/Text';
import { SpaceMedium, SpaceSmall, SpaceXLarge, SpaceXXXLarge } from '../../../components/Space';
import AdTile from '../../../components/Tiles/AdTile';
import ButtonTile from '../../../components/Tiles/ButtonTile';
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
                <div className="home-page-tile-button">
                    <ButtonTile title="데일리카 구독" subTitle="일상 생활용" backgroundImage={sampleImage1} aspectRatioDesktop="1/1" onClick={() => navigate('/products')} backgroundColor="#18B37B" titleColor="#fff" />
                    <ButtonTile title="스포츠카 구독" subTitle="스릴 넘치는" backgroundImage={sampleImage2} aspectRatioDesktop="1/1" onClick={() => navigate('/products')} backgroundColor="#0974F2" titleColor="#fff" />
                    <ButtonTile title="업무용 차량 구독" subTitle="비즈니스맨을 위한" backgroundImage={sampleImage3} aspectRatioDesktop="2/1" onClick={() => navigate('/products')} backgroundColor="#FA4659" titleColor="#fff" />
                </div>
                <SpaceXLarge />
                <button className="home-page-search">차량 검색</button>
                <div className="home-page-space" />
                <MainTitle> 신규 차량을 확인해 보세요. </MainTitle>
                <SubTitle> 이번 주에 새롭게 입고된 차량들을 확인해 보세요. </SubTitle>
                <SpaceSmall />
                <div className="home-page-tile-list">
                    <DetailTile title="488 GTB" category="Ferrari"  image={sampleImage1} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="S600" category="Mercedes-Benz" image={sampleImage2} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" subTitle="G83" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                </div>
                <SpaceXXXLarge />

                <MainTitle> 이런 차들은 어떠세요? </MainTitle>
                <SubTitle> 넘치는 매력으로 수요가 많은 차량이에요. </SubTitle>
                <SpaceSmall />
                <div className="home-page-tile-list">
                    <DetailTile title="488 GTB" category="Ferrari" image={sampleImage1} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="S600" category="Mercedes-Benz" image={sampleImage2} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                </div>
                <SpaceXXXLarge />

                <MainTitle> 곧 찾아오는 차량들 </MainTitle>
                <SubTitle> 수리비 걱정 없이 차량을 구독할 수 있어요! </SubTitle> 
                <SpaceSmall />
                <div className="home-page-tile-list">
                    <DetailTile title="488 GTB" category="Ferrari" image={sampleImage1} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="S600" category="Mercedes-Benz" image={sampleImage2} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
                    <DetailTile title="M4" category="BMW" image={sampleImage3} onClick={() => navigate('/products')} price="월 100,000원 부터" />
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