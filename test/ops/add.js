describe('test add', function() {
  const assert = chai.assert;
  const nn = navigator.ml.getNeuralNetworkContext();

  it('add constant and input', async function() {
    const a = nn.input('a', {type: 'tensor-float32', dimensions: [3, 4, 5]});
    const b = nn.constant({type: 'tensor-float32', dimensions: [3, 4, 5]},
        new Float32Array([
            -0.5781865 , -0.49248728, -0.2162451 , -0.13176449, -0.52118045,
            1.9125274 ,  0.6508799 ,  0.71873736, -2.3154447 ,  0.8080079 ,
            0.3022368 ,  0.21394566, -0.6511544 ,  0.20001237, -0.08041809,
            1.1127822 , -1.521739  ,  0.7249548 , -0.91961324, -0.83175105,
            -1.4569077 , -0.5417681 , -1.6476909 ,  0.1223801 ,  2.220618  ,
            -0.14914903,  0.7790501 , -0.18711103, -0.9941537 , -1.828552  ,
            -1.36035   ,  0.5727087 ,  2.5213664 , -0.3267195 ,  0.8431539 ,
            0.12337407,  1.0018097 , -0.23469485, -0.4530751 ,  0.09238022,
            0.7888511 ,  0.11107288,  0.48171726,  0.34308678, -0.90550417,
            0.203841  ,  0.02521433, -1.7966009 , -1.4287543 ,  0.3222213 ,
            1.0590587 , -1.7948701 , -1.7195907 , -0.9120889 , -0.9391962 ,
            -0.2566791 , -0.5464537 ,  1.4351872 ,  0.5705938 , -0.30327085]));
    const output = nn.add(a, b);
    const model = await nn.createModel([{name: 'output', operand: output}]);
    const compilation = await model.createCompilation();
    const execution = await compilation.createExecution();
    execution.setInput('a', new Float32Array([
        0.08939514, -1.5887482 ,  0.8545348 ,  0.20523034, -0.41728342,
        1.01752   ,  0.19677015,  0.5398451 ,  0.56893295,  1.2511084 ,
        2.0092728 ,  1.0606714 ,  0.4893267 ,  0.09536829, -2.3467007 ,
        2.4527607 ,  0.61307395, -1.0799897 , -0.15071101, -0.48422927,
        -0.20479254,  0.32798728, -0.37435308, -1.7116562 ,  1.6952512 ,
        -0.7479369 , -0.09019202,  0.14343949,  1.6754607 ,  1.6427531 ,
        0.9470988 ,  0.20872667, -1.9530525 , -0.21783416,  0.0309498 ,
        0.3008434 ,  1.1686599 ,  1.4920886 ,  0.06633294,  0.6674667 ,
        0.60627925,  0.04302086, -0.03482966, -0.7343786 , -0.76851964,
        0.9446942 , -0.35489243,  0.44452578,  0.00648887, -0.55656946,
        -0.735903  ,  0.22050636, -0.5008282 , -1.3132697 ,  1.6642882 ,
        -0.48397836,  0.20099205, -0.28786168,  1.3315053 , -0.41619393]));
    const outputBuffer = new Float32Array(60);
    execution.setOutput('output', outputBuffer);
    await execution.startCompute();
    const expected = [
        -0.48879138, -2.0812354 ,  0.6382897 ,  0.07346585, -0.93846387,
        2.9300475 ,  0.84765005,  1.2585825 , -1.7465117 ,  2.0591164 ,
        2.3115096 ,  1.2746171 , -0.16182771,  0.29538065, -2.4271188 ,
        3.565543  , -0.90866506, -0.3550349 , -1.0703243 , -1.3159803 ,
        -1.6617002 , -0.21378079, -2.022044  , -1.5892761 ,  3.9158692 ,
        -0.8970859 ,  0.6888581 , -0.04367155,  0.681307  , -0.18579888,
        -0.41325122,  0.7814354 ,  0.56831384, -0.54455364,  0.8741037 ,
        0.42421746,  2.1704698 ,  1.2573937 , -0.38674217,  0.7598469 ,
        1.3951304 ,  0.15409374,  0.4468876 , -0.3912918 , -1.6740239 ,
        1.1485353 , -0.32967812, -1.3520751 , -1.4222654 , -0.23434815,
        0.32315564, -1.5743638 , -2.220419  , -2.2253585 ,  0.72509193,
        -0.74065745, -0.34546167,  1.1473255 ,  1.9020991 , -0.7194648];
    checkOutput(outputBuffer, expected);
  });

  it('add two inputs', async function() {
    const a = nn.input('a', {type: 'tensor-float32', dimensions: [3, 4, 5]});
    const b = nn.input('b', {type: 'tensor-float32', dimensions: [3, 4, 5]});
    const output = nn.add(a, b);
    const model = await nn.createModel([{name: 'output', operand: output}]);
    const compilation = await model.createCompilation();
    const execution = await compilation.createExecution();
    execution.setInput('a', new Float32Array([
        0.08939514, -1.5887482 ,  0.8545348 ,  0.20523034, -0.41728342,
        1.01752   ,  0.19677015,  0.5398451 ,  0.56893295,  1.2511084 ,
        2.0092728 ,  1.0606714 ,  0.4893267 ,  0.09536829, -2.3467007 ,
        2.4527607 ,  0.61307395, -1.0799897 , -0.15071101, -0.48422927,
        -0.20479254,  0.32798728, -0.37435308, -1.7116562 ,  1.6952512 ,
        -0.7479369 , -0.09019202,  0.14343949,  1.6754607 ,  1.6427531 ,
        0.9470988 ,  0.20872667, -1.9530525 , -0.21783416,  0.0309498 ,
        0.3008434 ,  1.1686599 ,  1.4920886 ,  0.06633294,  0.6674667 ,
        0.60627925,  0.04302086, -0.03482966, -0.7343786 , -0.76851964,
        0.9446942 , -0.35489243,  0.44452578,  0.00648887, -0.55656946,
        -0.735903  ,  0.22050636, -0.5008282 , -1.3132697 ,  1.6642882 ,
        -0.48397836,  0.20099205, -0.28786168,  1.3315053 , -0.41619393]));
    execution.setInput('b', new Float32Array([
        -0.5781865 , -0.49248728, -0.2162451 , -0.13176449, -0.52118045,
        1.9125274 ,  0.6508799 ,  0.71873736, -2.3154447 ,  0.8080079 ,
        0.3022368 ,  0.21394566, -0.6511544 ,  0.20001237, -0.08041809,
        1.1127822 , -1.521739  ,  0.7249548 , -0.91961324, -0.83175105,
        -1.4569077 , -0.5417681 , -1.6476909 ,  0.1223801 ,  2.220618  ,
        -0.14914903,  0.7790501 , -0.18711103, -0.9941537 , -1.828552  ,
        -1.36035   ,  0.5727087 ,  2.5213664 , -0.3267195 ,  0.8431539 ,
        0.12337407,  1.0018097 , -0.23469485, -0.4530751 ,  0.09238022,
        0.7888511 ,  0.11107288,  0.48171726,  0.34308678, -0.90550417,
        0.203841  ,  0.02521433, -1.7966009 , -1.4287543 ,  0.3222213 ,
        1.0590587 , -1.7948701 , -1.7195907 , -0.9120889 , -0.9391962 ,
        -0.2566791 , -0.5464537 ,  1.4351872 ,  0.5705938 , -0.30327085]));
    const outputBuffer = new Float32Array(60);
    execution.setOutput('output', outputBuffer);
    await execution.startCompute();
    const expected = [
        -0.48879138, -2.0812354 ,  0.6382897 ,  0.07346585, -0.93846387,
        2.9300475 ,  0.84765005,  1.2585825 , -1.7465117 ,  2.0591164 ,
        2.3115096 ,  1.2746171 , -0.16182771,  0.29538065, -2.4271188 ,
        3.565543  , -0.90866506, -0.3550349 , -1.0703243 , -1.3159803 ,
        -1.6617002 , -0.21378079, -2.022044  , -1.5892761 ,  3.9158692 ,
        -0.8970859 ,  0.6888581 , -0.04367155,  0.681307  , -0.18579888,
        -0.41325122,  0.7814354 ,  0.56831384, -0.54455364,  0.8741037 ,
        0.42421746,  2.1704698 ,  1.2573937 , -0.38674217,  0.7598469 ,
        1.3951304 ,  0.15409374,  0.4468876 , -0.3912918 , -1.6740239 ,
        1.1485353 , -0.32967812, -1.3520751 , -1.4222654 , -0.23434815,
        0.32315564, -1.5743638 , -2.220419  , -2.2253585 ,  0.72509193,
        -0.74065745, -0.34546167,  1.1473255 ,  1.9020991 , -0.7194648];
    checkOutput(outputBuffer, expected);
  });

  it('add broadcast', async function() {
    const a = nn.input('a', {type: 'tensor-float32', dimensions: [3, 4, 5]});
    const b = nn.input('b', {type: 'tensor-float32', dimensions: [5]});
    const output = nn.add(a, b);
    const model = await nn.createModel([{name: 'output', operand: output}]);
    const compilation = await model.createCompilation();
    const execution = await compilation.createExecution();
    execution.setInput('a', new Float32Array([
        -0.08539673,  0.11800674, -1.2358714 ,  0.30089188, -0.73443925,
        1.4894297 ,  0.16823359, -2.2034893 ,  1.0740992 , -0.35457978,
        0.61524934,  0.462153  ,  0.5992003 , -0.81047946, -2.2757835 ,
        -0.21841764,  1.1650828 , -0.56927145,  1.9960726 ,  0.62048405,
        0.10586528, -1.0386543 , -1.9402571 , -2.0906122 , -0.4305259 ,
        -1.2730165 ,  1.5639576 ,  0.53357494, -0.8079486 , -0.06450062,
        -0.7841324 , -0.24135855,  1.9275267 ,  0.4476717 ,  0.15467685,
        -1.2363592 , -0.50745815,  0.03250425,  0.86344534, -0.7938714 ,
        1.1835734 ,  1.515135  ,  0.3092435 , -1.311751  , -0.6659017 ,
        0.8815683 , -0.31157655,  0.57511795, -1.1924151 , -1.8408557 ,
        -0.85080767, -1.3341717 ,  0.54687303, -0.14426671, -0.15728855,
        0.323939  ,  1.167636  ,  0.03020451,  0.91373825,  1.0675793]));
    execution.setInput('b', new Float32Array([
        0.6338172,  1.630534 , -1.3819867, -1.0427561,  1.058136]));
    const outputBuffer = new Float32Array(60);
    execution.setOutput('output', outputBuffer);
    await execution.startCompute();
    const expected = [
        0.5484205 ,  1.7485408 , -2.6178582 , -0.7418642 ,  0.32369673,
        2.123247  ,  1.7987677 , -3.585476  ,  0.0313431 ,  0.7035562 ,
        1.2490666 ,  2.0926871 , -0.7827864 , -1.8532355 , -1.2176476 ,
        0.41539955,  2.7956169 , -1.9512582 ,  0.95331657,  1.6786201 ,
        0.7396825 ,  0.5918797 , -3.3222437 , -3.1333683 ,  0.6276101 ,
        -0.63919926,  3.1944916 , -0.8484118 , -1.8507047 ,  0.99363536,
        -0.15031523,  1.3891755 ,  0.54554   , -0.59508437,  1.2128129 ,
        -0.60254204,  1.123076  , -1.3494825 , -0.17931074,  0.26426458,
        1.8173906 ,  3.145669  , -1.0727432 , -2.354507  ,  0.39223427,
        1.5153855 ,  1.3189576 , -0.8068688 , -2.2351713 , -0.78271973,
        -0.21699047,  0.2963624 , -0.8351137 , -1.1870228 ,  0.90084743,
        0.95775616,  2.79817   , -1.3517822 , -0.12901783,  2.1257153];
    checkOutput(outputBuffer, expected);
  });
});