import React, { memo, useEffect, useMemo, useCallback } from 'react';
import { useFluxible } from 'fluxible-addons-react';
import { connectToStores } from 'fluxible-addons-react';
import classNames from 'clsx';

import Card from './common/Card.jsx';
import Img from './common/Img.jsx';
import Smartlink from './common/Smartlink.jsx';
import StaticContentStore from '../stores/StaticContentStore';

import Carousel from './common/Carousel';

import fetchStaticDataAction from '../actions/fetchStaticData';

const Experience = (props) => {
  const { experience } = props;
  const { executeAction } = useFluxible();
  const { companies } = experience || {};

  useEffect(() => {
    executeAction(fetchStaticDataAction, {
      resource: 'experience',
    });
  }, []);

  const renderProjects = useCallback((projects) => {
    if (!projects?.length) {
      return null;
    }
    let nodes = projects.map((project, i) => {
      let { smartlink, demos } = project;
      return (
        <li
          className="Pstart(20px) Pstart(0)--xs Py(10px) Mb(20px) Mb(10px)!--xs"
          key={i}
        >
          <div className="Fz(1.2em) Mb(6px)">{project.name}</div>
          <div className="Fs(i) Mb(6px) Fz(.9em) C($c-black-3)">
            {project.time}
          </div>
          <div className="Mb(6px)">{project.summary}</div>
          <div className="C($c-black-3)">Tech stack: {project.techStack}</div>
          <Smartlink smartlink={smartlink} />
          {demos && demos.length && (
            <Carousel
              nodes={demos.map((node) => {
                if (node.type === 'iframe') {
                  return (
                    <iframe
                      title={node.title}
                      loading="lazy"
                      src={node.url}
                      frameBorder="0"
                    />
                  );
                }
              })}
            />
          )}
        </li>
      );
    });
    return <ul>{nodes}</ul>;
  }, []);

  const companiesNode = useMemo(() => {
    if (!companies || !companies.length) {
      return null;
    }
    let nodes = companies.map((company, i) => {
      let { projects } = company;
      return (
        <div
          key={i}
          className={classNames('Py(10px)', {
            'Bdbw(2px) Bdbs(s) Bdbc($c-black-4)': i !== companies.length - 1,
          })}
        >
          <div className="Cf Mt(10px)">
            {company.logo ? (
              <Img
                nodeName="div"
                src={company.logo}
                className="Bgz(ct) W(100px) H(30px) Bgr(nr) Fl(end)"
              />
            ) : null}
            <h4 className="M(0)">{company.name}</h4>
          </div>
          <div>
            <h5>{company.title}</h5>
            <div className="C($c-black-3)">
              {company.time} | {company.location}
            </div>
          </div>
          <div>{renderProjects(projects)}</div>
        </div>
      );
    });

    return nodes;
  }, [companies, renderProjects]);

  if (!experience || !Object.keys(experience).length) {
    return null;
  }

  return (
    <Card>
      <h5 className="My(10px) Mx(0) C($c-black-2) Fw(400)">Experiences</h5>
      {companiesNode}
    </Card>
  );
};

export default connectToStores(
  memo(Experience),
  [StaticContentStore],
  (context, props) => {
    return {
      experience: context.getStore(StaticContentStore).getData('experience'),
    };
  }
);
