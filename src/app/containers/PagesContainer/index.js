import React, { PropTypes } from 'react';

import pagesHoc from 'containers/PagesContainer/pagesHoc';
import PageComponent from 'components/page/PageComponent';
import IsLoadingComponent from 'components/isLoading/IsLoadingComponent';
import IsEmptyComponent from 'components/isEmpty/IsEmptyComponent';

export class PagesContainer extends React.Component {
  componentWillMount() {
    const { categoryId, subCategoryId } = this.props.location.query;
    this.props.getPagesRequest({ categoryId, subCategoryId });
    this.props.getPageCategoriesRequest();
  }

  componentWillUnmount() {
    this.props.getPagesIdle();
    this.props.getPageCategoriesIdle();
  }

  render() {
    return (
      <div className="PagesContainerBlock">
        <div className="PagesContainerBlock-title">Pages</div>

        <div className="PagesContainer">
          <IsLoadingComponent isLoading={this.props.isLoading}>
            <IsEmptyComponent isEmpty={this.props.isEmpty}>
              <div className="PagesContainer-pages">
                {this.props.pages.data && this.props.pages.data.map((page, key) =>
                  <div key={key}><PageComponent page={page} height={this.props.maxHeight} /></div>
                )}
              </div>
            </IsEmptyComponent>
          </IsLoadingComponent>
        </div>
      </div>
    );
  }
}

PagesContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  pages: PropTypes.array.isRequired,
  getPagesRequest: PropTypes.func.isRequired,
  getPageCategoriesRequest: PropTypes.func.isRequired,
  getPagesIdle: PropTypes.func.isRequired,
  getPageCategoriesIdle: PropTypes.func.isRequired,
  maxHeight: PropTypes.number,
};

export default pagesHoc(PagesContainer);
