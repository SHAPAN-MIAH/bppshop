import React from "react";
import { useNavigate } from "react-router-dom";
import defaultProImg from "../../../Assets/Images/defaultImg.jpg";
import { categoryBaseUrl } from "../../../BaseUrl/BaseUrl";

const SubCategoryCard = ({ subcategory }) => {
  const { id, name, slug, thumb } = subcategory;
  const navigate = useNavigate();
  const handleSubSubCategoryView = (id, subSlug) => {
    if (id) {
      navigate(subSlug);
    }
  };

  return (
    <div
      onClick={() => handleSubSubCategoryView(id, slug)}
      className="category_card_content"
    >
      <div className="card">
        <div className="category_card-body">
        {thumb? <img src={categoryBaseUrl + `/${thumb}`} className="card-img-top" alt="" /> : <img src={defaultProImg} alt=""/>}
        </div>
        <div className="card-footer">{name}</div>
      </div>
    </div>
  );
};

export default SubCategoryCard;
