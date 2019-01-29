import Fragment from '../../../src/loader/fragment';

describe('Fragment class tests', function () {
  /**
   * @type {Fragment}
   */
  let frag;
  beforeEach(function () {
    frag = new Fragment();
  });

  describe('parseByteRange', function () {
    it('parses byte range string with length@offset', function () {
      frag.parseByteRange('1000@10000');
      expect(frag.byteRangeStartOffset).to.equal(10000);
      expect(frag.byteRangeEndOffset).to.equal(11000);
    });

    it('parses byte range with no offset and uses 0 as offset', function () {
      frag.parseByteRange('5000');
      expect(frag.byteRangeStartOffset).to.equal(0);
      expect(frag.byteRangeEndOffset).to.equal(5000);
    });

    it('parses byte range with no offset and uses 0 as offset', function () {
      const prevFrag = new Fragment();
      prevFrag.parseByteRange('1000@10000');
      frag.parseByteRange('5000', prevFrag);
      expect(frag.byteRangeStartOffset).to.equal(11000);
      expect(frag.byteRangeEndOffset).to.equal(16000);
    });
  });

  describe('endProgramDateTime getter', function () {
    it('computes endPdt when pdt and duration are valid', function () {
      frag.programDateTime = 1000;
      frag.duration = 1;
      expect(frag.endProgramDateTime).to.equal(2000);
    });

    it('considers 0 a valid pdt', function () {
      frag.programDateTime = 0;
      frag.duration = 1;
      expect(frag.endProgramDateTime).to.equal(1000);
    });

    it('returns null if pdt is NaN', function () {
      frag.programDateTime = 'foo';
      frag.duration = 1;
      expect(frag.endProgramDateTime).to.equal(null);
    });

    it('defaults duration to 0 if duration is NaN', function () {
      frag.programDateTime = 1000;
      frag.duration = 'foo';
      expect(frag.endProgramDateTime).to.equal(1000);
    });
  });
});
