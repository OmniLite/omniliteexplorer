/**
 *
 * Blocks
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import ListHeader from 'components/ListHeader';
import BlockList from 'components/BlockList';
import LoadingIndicator from 'components/LoadingIndicator';
import JumpToBlock from 'components/JumpToBlock';
import NoOmniBlocks from 'components/NoOmniBlocks';
import StyledA from 'components/StyledA';

import isEmpty from 'lodash/isEmpty';
import { useInjectSaga } from 'utils/injectSaga';
import sagaBlocks from 'containers/Blocks/saga';
import { FIRST_BLOCK } from 'containers/App/constants';
import { Col, Row } from 'reactstrap';
import getLocationPath, {getSufixURL} from 'utils/getLocationPath';

import { makeSelectLocation } from 'containers/App/selectors';

import { makeSelectBlocks, makeSelectLatestBlock, makeSelectLoading, makeSelectPreviousBlock } from './selectors';
import { disableLoading, loadBlocks } from './actions';
import messages from './messages';

const LinkPrevious = styled(StyledA)``;

const DisabledStyledA = styled(StyledA)`
            pointer-events: none;
            text-decoration: none;
            opacity: 0.5;
            cursor: not-allowed;
          `;

export function Blocks(props) {
  const block = props.match.params.block || '';

  useInjectSaga({
    key: 'blocks',
    saga: sagaBlocks,
  });

  useEffect(() => {
    props.loadBlocks(block);
  }, [block]);

  let content;
  let pagination;
  if (props.loading && !props.previousBlock) {
    content = <LoadingIndicator />;
  } else {
    const { blocks } = props.blocks;
    const list =
      isEmpty(blocks) || block > blocks[0].block + 9 ? (
        <NoOmniBlocks />
      ) : (
        <BlockList blocks={blocks} />
      );

    content = <div>{list}</div>;

    const pathname =
      props.location.pathname.toLowerCase().indexOf('block') > -1
        ? `${getSufixURL()}/blocks/`
        : `${getSufixURL()}/`;
    const hashLink = blockNum => `${pathname}${blockNum}`;

    const previousBlockSet = () => {
      let result;
      const previous = block - 10;
      if (isEmpty(blocks)) {
        result = previous > FIRST_BLOCK ? previous : FIRST_BLOCK;
      } else if (block > blocks[0].block + 9) {
        result = blocks[0].block;
      } else {
        result = blocks[blocks.length - 1].block - 1;
      }
      return result;
    };

    const nextBlockSet = () => {
      let result;
      if (isEmpty(blocks) || block > blocks[0].block + 9) {
        result = (parseInt(block, 10) || FIRST_BLOCK) + 10;
      } else {
        result = blocks[0].block + 10;
      }
      return result;
    };

    const LinkNext =
      isEmpty(blocks) || props.latest > blocks[0].block
        ? StyledA
        : DisabledStyledA;

    pagination = (
      <Row noGutters>
        <Col>
          <h3>
            <LinkPrevious href={hashLink(previousBlockSet())}>
              &lt;&lt; Older
            </LinkPrevious>
          </h3>
        </Col>
        <Col className="text-right">
          <h3>
            <LinkNext href={hashLink(nextBlockSet())}>Newer &gt;&gt;</LinkNext>
          </h3>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <ListHeader message={messages.header}>
        <JumpToBlock
          onValidate={value => value <= props.latest}
        />
      </ListHeader>
      {content}
      {props.withPagination && pagination}
    </div>
  );
}

Blocks.propTypes = {
  blocks: PropTypes.object.isRequired,
  loadBlocks: PropTypes.func,
  disableLoading: PropTypes.func,
  loading: PropTypes.bool,
  previousBlock: PropTypes.any,
  latest: PropTypes.any,
  match: PropTypes.object,
  location: PropTypes.object,
  withPagination: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  blocks: makeSelectBlocks(),
  loading: makeSelectLoading(),
  previousBlock: makeSelectPreviousBlock(),
  latest: makeSelectLatestBlock(),
  location: state => state.route.location,
  locationDos: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadBlocks: block => dispatch(loadBlocks(block)),
    disableLoading: () => dispatch(disableLoading()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(Blocks);
