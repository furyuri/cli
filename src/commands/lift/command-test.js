import * as lifter from '@form8ion/lift';
import {removeGreenkeeper} from '@form8ion/remove-greenkeeper';
import {scaffold as scaffoldDependabot} from '@form8ion/dependabot-scaffolder';
import {replace as replaceTravisCiWithGithubActions} from '@form8ion/replace-travis-ci-with-github-actions';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import {command, describe, handler} from '.';

suite('lift command', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(lifter, 'lift');
  });

  teardown(() => sandbox.restore());

  test('that the lift command is defined', async () => {
    const liftingResults = any.simpleObject();
    lifter.lift
      .withArgs({
        scaffolders: {
          Dependabot: scaffoldDependabot,
          'Remove Greenkeeper': removeGreenkeeper,
          'Replace Travis CI with GitHub Actions': replaceTravisCiWithGithubActions
        }
      })
      .resolves(liftingResults);

    assert.equal(await handler(), liftingResults);
    assert.equal(command, 'lift');
    assert.equal(describe, 'Lift an existing project with additional functionality');
  });
});
