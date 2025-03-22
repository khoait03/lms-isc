import Accordion from './ListDist';
import CommendationList from './CommendationList';
import AccordionStudy from './ResultStudy';

const ProfileManagement = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Trang hồ sơ</h1>
      <h1 className="text-3xl font-bold">Quá trình học tập</h1>
      <AccordionStudy title="Kết quả học tập"></AccordionStudy>
      <CommendationList title="Danh sách khen thưởng" />
      <Accordion title="Danh sách kỷ luật"></Accordion>
    </div>

  )
}

export default ProfileManagement;