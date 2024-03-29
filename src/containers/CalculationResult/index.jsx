import React, { useEffect, useState } from 'react';
import PT from 'prop-types';
import Sticky from 'react-stickynode';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from 'topcoder-react-ui-kit';
import Card from '../../components/Card';
import DonutChart from '../../components/DonutChart';
import LineChart from '../../components/LineChart';
import CardMember from '../../components/CardMember';
import SlideShow from '../../components/SlideShow';
import actions from '../../actions';
import * as utils from '../../utils';
import IconBanking from '../../assets/icons/banking.svg';
import IconConsumerGoods from '../../assets/icons/consumer-goods.svg';
import IconEnergy from '../../assets/icons/energy.svg';
import IconEntertainment from '../../assets/icons/entertainment.svg';
import IconHealthcare from '../../assets/icons/healthcare.svg';
import IconPharma from '../../assets/icons/pharma.svg';
import IconTechnologyServices from '../../assets/icons/tech-services.svg';
import IconTelecoms from '../../assets/icons/telecom.svg';
import IconPublicSector from '../../assets/icons/public-sector.svg';
import IconTravelHospitality from '../../assets/icons/travel-hospitality.svg';
import IconRecalculate from '../../assets/icons/recalculate.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './styles.scss';
import PrintMember from '../../components/PrintMember';
const ref = React.createRef();
import logo from 'assets/images/logo.svg';

const Prints = ({
                  form,
                  result,
                  talents,
                  getTalents,
                  industryIcon,
                  industry
                }) =>
{
  let members = 0;
  return (
      <div id={'capture-result'}>
        <div styleName="content-center">
          <img src={logo} styleName="logo" alt="logo" />
          <h1 styleName="display-2">TAAS ROI CALCULATOR</h1>
        </div>
        <div style={{paddingTop: 'unset', paddingBottom: 'unset', paddingLeft:'20px', paddingRight: '30px', marginLeft: 'unset', marginRight: 'unset', width: '100%'}}>
          <div styleName="page-download print-screen" style={{ paddingLeft: 'unset', paddingRight: 'unset',marginLeft: 'unset', marginRight: 'unset', width: '100%'}}>
            <div ref={ref} styleName="row">
              <div styleName="col">
                <div styleName="left-section">
                  <h3 styleName="heading-3" className="upper-case" style={{color: 'orange'}} >
                    Hello
                    {' '}
                    {form.firstName},
                  </h3>
                  <p styleName="text margin-top-extra">
                    Based on the information you’ve provided us, plus our market research,
                    here is your customized cost comparison for hiring
                    {' '}
                    {utils.format2DigitsNumber(result.numberOfEmployee)}
                    {' '}
                    <span styleName="text-capitalize">
                      {result.numberOfEmployee !== '1' ? utils.formatPluralNoun(form.talentType) : form.talentType}
                    </span>
                    {' '}
                    to
                    {' '}
                    <span styleName="text-capitalize">{form.company}</span>
                    .
                  </p>
                  <p styleName="text">
                    Hiring
                    {' '}
                    {utils.formatPluralNoun(form.talentType)}
                    {' '}
                    on Topcoder’s TaaS platform saves you time
                    and money. Our solution is charged at a flat rate of
                    {' '}
                    <span>{utils.formatMoneyValueI(result.topcoderWeeklyCost)}</span>
                    {' '}
                    per week and
                    freelancers are often able to start within days, not weeks. This allows you
                    to start producing results and raising team productivity quicker.
                  </p>
                </div>
              </div>
            </div>
            <div styleName="row">
              <div styleName="col">
                <div styleName="card-container">
                  <div styleName="row">
                    <div styleName="col result-container">
                      {/*YOUR RESULT S*/}
                      <div styleName='margin-card-bottom card-border'>
                        <div styleName='card-download'>
                          <div styleName='card-header-download'>
                            <h6 styleName="heading-6" className="text-violet">YOUR RESULT</h6>
                          </div>
                          <div styleName='card-body-download'>
                            <div styleName='print-container'>
                              <div styleName='box'>
                                <span styleName='value heading-3'>{result.numberOfEmployee === "10 or more" ? "> 10" : utils.format2DigitsNumber(result.numberOfEmployee)}</span>
                                <span styleName='description'>{result.numberOfEmployee !== '1' ? utils.formatPluralNoun(form.talentType) : form.talentType}</span>
                              </div>
                              <div styleName='box padding-extra'>
                                <span styleName='value heading-3'>{result.costOfLiving || '\u00a0'}</span>
                                <span styleName='description'>COST OF LIVING</span>
                              </div>
                              <div styleName='box'>
                                <span styleName='value heading-3'>{industryIcon}</span>
                                <span styleName='description'>{industry}</span>
                              </div>
                            </div>
                            <div styleName='print-container'>
                              <div styleName='box'>
                                <span styleName='value heading-3'>{utils.formatMoneyValueK(result.averageSalary)}</span>
                                <span styleName='description'>AVERAGE SALARY</span>
                              </div>
                              <div styleName='box'>
                                <span styleName='value heading-3'>{utils.formatMoneyValueK(result.bonusEquityBenefits)}</span>
                                <span styleName='description'>{'BONUSES & BENEFITS'}</span>
                              </div>
                              <div styleName='box'>
                                <span styleName='value heading-3'>{utils.formatMoneyValueK(result.recruiment + result.overhead)}</span>
                                <span styleName='description'>RECRUITMENT &amp; OVERHEAD</span>
                              </div>
                            </div>
                            <div styleName="total">
                            <span styleName="annually">
                                TOTAL ANNUALLY:
                              {' '}
                              <span styleName="value">{utils.formatMoneyValueI(result.totalAnnualCost)}</span>
                            </span>
                              <span styleName="weekly">
                                WEEKLY COST:
                                {' '}
                                <span styleName="value">{utils.formatMoneyValueI(result.totalWeeklyCost)}</span>
                            </span>
                            </div>
                          </div>
                          <div styleName='card-footer-download'>
                            <div styleName="save">
                            <span>
                              TOPCODER WEEKLY COST:
                              {' '}
                              {utils.formatMoneyValueI(result.topcoderWeeklyCost)}
                              {' '}
                              <small>(+TAX)</small>
                            </span>
                              <span>
                              YOU SAVE:
                                {' '}
                                {utils.formatMoneyValueI(result.youSave)}
                                / WEEK
                            </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*FREELANCER VS. TRADITIONAL HIRING*/}
                      <div styleName='margin-card-bottom card-border'>
                        <div styleName='card-download'>
                          <div styleName='card-header-download'>
                            <h6 styleName="heading-6" className="text-green">FREELANCER VS. TRADITIONAL HIRING</h6>
                          </div>
                          <div styleName='card-body-download'>
                            <p styleName="text margin-top">
                              By the time your traditionally hired FTE goes through recruitment, interviews,
                              negotiations and agreeing on start dates; the talent at Topcoder has already been
                              working for months at 100% productivity. We can go from the initial request to top-tier
                              verified talent working for you, fast.
                            </p>
                            <div styleName="line-chart-container">
                              <div styleName="line-chart-box">
                                <LineChart height={ undefined} />
                              </div>
                              <div styleName="line-legend-box">
                            <span styleName="label">
                              <i styleName="dot dot-1" />
                              {' '}
                              Topcoder TaaS Process
                            </span>
                                <span styleName="label">
                            <i styleName="dot dot-2" />
                                  {' '}
                                  Traditional Hiring Process
                            </span>
                              </div>
                              <div styleName="message">
                                <span className="text-green">AVG. PRODUCTIVITY GAIN:</span> <span>280 Hours In The First 3 Months</span>
                              </div>
                              <p styleName="footer">
                                Calculation Based on Average Time to Hire of 30 Days (Traditional FTE Labor) and 40-hours per week usage of Topcoder
                                TaaS Freelancer(s)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div styleName="col">
                      {/*VISUAL BREAKDOWN*/}
                      <div styleName='margin-card-bottom card-border'>
                        <div styleName='card-download'>
                          <div styleName='card-header-download'>
                            <h6 styleName="heading-6" className="text-darkCyan">VISUAL BREAKDOWN</h6>
                          </div>
                          <div styleName='card-body-download'>
                            <div styleName="donut-chart-container">
                              <div styleName="donut-chart-box">
                                <DonutChart data={{
                                  annualSalary: result.averageSalary,
                                  bonus: result.bonusEquityBenefits,
                                  recruiment: result.recruiment,
                                  overhead: result.overhead,
                                }}
                                />
                              </div>
                              <div styleName="donut-legend-box">
                                <h4 styleName="heading-4">
                                  Total Annual Cost:
                                  {utils.formatMoneyValueI(result.totalAnnualCost)}
                                </h4>
                                <div>
                          <span styleName="label">
                            <i styleName="dot dot-1" />
                            {' '}
                            Annual Salary
                          </span>
                                  <span styleName="label">
                            <i styleName="dot dot-2" />
                                    {' '}
                                    Bonus, Equity &amp; Benefits
                          </span>
                                  <span styleName="label">
                            <i styleName="dot dot-3" />
                                    {' '}
                                    Recruiment Costs
                          </span>
                                  <span styleName="label">
                            <i styleName="dot dot-4" />
                                    {' '}
                                    Employee Overheads
                          </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*THE TALENT*/}
                      <div styleName='margin-card-bottom card-border'>
                        <div styleName='card-download'>
                          <div styleName='card-header-download'>
                            <h6 styleName="heading-6" className="text-red">THE TALENT</h6>
                          </div>
                          <div styleName='card-body-download'>
                            <p styleName="text margin-top">
                              The talent on our platform are virtual collaboration professionals. They are
                              used to sliding seamlessly into new teams and exciting projects and are ready to
                              get to work right away. Here is a snapshot of the talent on our platform.
                            </p>
                            <div styleName="talents">
                              {
                                talents.map((talent, index) => {
                                  // check if talent if equal to form selected talent
                                  const showTalent = talent.tags.some(tag => {
                                    return tag.label === form.talentType;
                                  })
                                  if(!showTalent || members >= 4) return null;
                                  members++;

                                  return(
                                      <div
                                          key={talent.member.handle}
                                      >
                                        <PrintMember
                                            member={talent.member}
                                            tags={talent.tags}
                                            wins={talent.wins}
                                            skills={talent.skills}
                                            experience={talent.experience}
                                            formType={form.talentType}
                                        />
                                      </div>
                                  )
                                })
                              }

                            </div>
                          </div>
                        </div>
                      </div>
                      <div styleName="freelance-demo text bolder">

                        If you’re ready to see how Topcoder can help turbocharge your team’s
                        results and output, schedule a demo with us today.
                        <br/><br/>
                        <a href='https://go.topcoder.com/freelance-demo/' style={{color: 'orange', textDecoration: 'none'}}>
                          go.topcoder.com/freelance-demo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div styleName="footer-download">
          <p>Wage and salary data:
            {' '}
            <a href="https://www.glassdoor.com/">glassdoor.com</a>
            . Bonus, equity, other benefits & employee overhead data: MIT study
            {' '}
            <a href="https://web.mit.edu/e-club/hadzima/pdf/how-much-does-an-employee-cost.pdf">How Much Does An Employee Cost?</a>
            . Recruiting & time to hire data: workable.com
            {' '}
            <a href="https://resources.workable.com/tutorial/faq-recruitment-budget-metrics">Recruiting Costs: Budget and Cost per Hire | Recruiting Metrics FAQ</a>
          </p>
        </div>
      </div>
  )
}

const CalculationResult = ({
  form,
  result,
  talents,
  getTalents,
}) => {

  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  useEffect(() => {
    if (form.talentType) {
      const allTalentsOfType = process.env.TALENT.TALENTS;
      // only get the first ${process.env.TALENT.TOTAL_SLIDES} members
      getTalents([...allTalentsOfType]);
    }
  }, [form]);

  useEffect(() => {
    document.getElementById('capture-result').style.position = 'absolute';
    document.getElementById('capture-result').style.top = '-65432px';
    document.getElementById('capture-result').style.width = '100%';
  }, []);

  const history = useHistory();
  const navigateTo = (path) => {
    history.push(path);
  };

  const isMobileOrTablet = useMediaQuery({ query: `(max-width: ${process.env.SCREEN.MD}px)` });
  const industry = form.industry === 'Tech & technology services' ? 'Technology Services' : form.industry;
  let industryIcon;
  let members = 0;

  switch (result.industryIcon) {
    case 'banking.svg': industryIcon = <IconBanking />; break;
    case 'consumer-goods.svg': industryIcon = <IconConsumerGoods />; break;
    case 'energy.svg': industryIcon = <IconEnergy />; break;
    case 'entertainment.svg': industryIcon = <IconEntertainment />; break;
    case 'healthcare.svg': industryIcon = <IconHealthcare />; break;
    case 'pharma.svg': industryIcon = <IconPharma />; break;
    case 'tech-services.svg': industryIcon = <IconTechnologyServices />; break;
    case 'telecom.svg': industryIcon = <IconTelecoms />; break;
    case 'public-sector.svg': industryIcon = <IconPublicSector />; break;
    case 'travel-hospitality.svg': industryIcon = <IconTravelHospitality />; break;
    default: industryIcon = null;
  }

  const downloadResults = () => {
      setIsLoadingPdf(true);
      document.getElementById('capture-result').style.position = 'relative';
      html2canvas(document.getElementById('capture-result'),{
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        removeContainer: true
        }).then(canvas => {
        document.getElementById('capture-result').style.position = 'absolute';
        document.getElementById('capture-result').style.visibility = 'hidden';
        document.getElementById('capture-result').style.height = 0;
          // document.body.appendChild(canvas);
          const pdf = new jsPDF('p', 'mm', [297, 210]);
          let width = pdf.internal.pageSize.getWidth();
          let height = pdf.internal.pageSize.getHeight();
          pdf.addImage(canvas, 'PNG', 0, 0, width, height,'PDF','FAST');
          pdf.save('topcoder-taas-roi-calculator.pdf');
          setIsLoadingPdf(false);
      });

  }
  return (
    <div styleName="page" id="calculationResult" >
      <div styleName="row" id={'result-container'}>
        <div styleName="col">
          <Sticky top={160} enabled={!isMobileOrTablet} bottomBoundary={2560}>
            <div styleName="left-section">
              <h3 styleName="heading-3 text-gradient" className="upper-case">
                Hello
                {' '}
                <span className="upper-case">{form.firstName}</span>
                ,
              </h3>
              <p styleName="text margin-top-extra">
                Based on the information you’ve provided us, plus our market research,
                here is your customized cost comparison for hiring
                {' '}
                {utils.format2DigitsNumber(result.numberOfEmployee)}
                {' '}
                <span styleName="text-capitalize">
                  {result.numberOfEmployee !== '1' ? utils.formatPluralNoun(form.talentType) : form.talentType}
                </span>
                {' '}
                to
                {' '}
                <span styleName="text-capitalize">{form.company}</span>
                .
              </p>
              <p styleName="text">
                Hiring
                {' '}
                {utils.formatPluralNoun(form.talentType)}
                {' '}
                on Topcoder’s TaaS platform saves you time
                and money. Our solution is charged at a flat rate of
                {' '}
                <span>{utils.formatMoneyValueI(result.topcoderWeeklyCost)}</span>
                {' '}
                per week and
                freelancers are often able to start within days, not weeks. This allows you
                to start producing results and raising team productivity quicker.
              </p>
              <hr styleName="horizontal-line" />
              <p styleName="text bolder">
                If you’re ready to see how Topcoder can help turbocharge your team’s
                results and output, schedule a demo with us today.
              </p>
              { !utils.platform.isMobileOS() && (
                <div styleName="buttons">
                  <PrimaryButton to={process.env.CALENDLY_URL} size={isMobileOrTablet ? 'sm' : ''}>SCHEDULE A TAAS DEMO</PrimaryButton>
                  <SecondaryButton onClick={downloadResults} size={isMobileOrTablet ? 'sm' : ''}>
                    DOWNLOAD RESULTS
                    {
                      isLoadingPdf && <div styleName='loader'></div>
                    }
                  </SecondaryButton>
                </div>
              )}
            </div>
          </Sticky>
        </div>
        <div styleName="col">
          <div styleName="card-container">
            {/* YOUR RESULTS */}
            <Card>
              <Card.Header>
                <div styleName='heading-card'>
                  <h6 styleName='heading-6' className='text-violet'>YOUR RESULT</h6>
                </div>
                <div styleName='result-recalculate'>
                  <SecondaryButton onClick={() => { navigateTo('/') & window.location.reload(false); }} size={isMobileOrTablet ? 'sm' : ''}>RECALCULATE &nbsp;
                    <img src={IconRecalculate} alt='recalculated' />
                  </SecondaryButton>
                </div>
              </Card.Header>
              <Card.Body>
                <div styleName="box-container">
                  <div styleName="box">
                    <span styleName="value heading-3">{result.numberOfEmployee === "10 or more" ? "> 10" : utils.format2DigitsNumber(result.numberOfEmployee)}</span>
                    <span styleName="description">{result.numberOfEmployee !== '1' ? utils.formatPluralNoun(form.talentType) : form.talentType}</span>
                  </div>
                  <div styleName="box padding-extra">
                    <span styleName="value heading-3">{result.costOfLiving || '\u00a0'}</span>
                    <span styleName="description">COST OF LIVING</span>
                  </div>
                  <div styleName="box">
                    <span styleName="value heading-3">{industryIcon}</span>
                    <span styleName="description">{industry}</span>
                  </div>
                  <div styleName="box">
                    <span styleName="value heading-3">{utils.formatMoneyValueK(result.averageSalary)}</span>
                    <span styleName="description">AVERAGE SALARY</span>
                  </div>
                  <div styleName="box">
                    <span styleName="value heading-3">{utils.formatMoneyValueK(result.bonusEquityBenefits)}</span>
                    <span styleName="description">{!isMobileOrTablet ? 'BONUS, EQUITY, BENEFITS' : 'BONUSES & BENEFITS'}</span>
                  </div>
                  <div styleName="box">
                    <span styleName="value heading-3">{utils.formatMoneyValueK(result.recruiment + result.overhead)}</span>
                    <span styleName="description">RECRUITMENT &amp; OVERHEAD</span>
                  </div>
                </div>
                <div styleName="total">
                  <span styleName="annually">
                    TOTAL ANNUALLY:
                    {' '}
                    <span styleName="value">{utils.formatMoneyValueI(result.totalAnnualCost)}</span>
                  </span>
                  <span styleName="weekly">
                    WEEKLY COST:
                    {' '}
                    <span styleName="value">{utils.formatMoneyValueI(result.totalWeeklyCost)}</span>
                  </span>
                </div>
              </Card.Body>
              <Card.Footer>
                <div styleName="save">
                  <span>
                    TOPCODER WEEKLY COST:
                    {' '}
                    {utils.formatMoneyValueI(result.topcoderWeeklyCost)}
                    {' '}
                    <small>(+TAX)</small>
                  </span>
                  <span>
                    YOU SAVE:
                    {' '}
                    {utils.formatMoneyValueI(result.youSave)}
                    / WEEK
                  </span>
                </div>
              </Card.Footer>
            </Card>

            {/* VISUAL BREAKDOWN */}
            <Card>
              <Card.Header>
                <h6 styleName="heading-6" className="text-darkCyan">VISUAL BREAKDOWN</h6>
              </Card.Header>
              <Card.Body>
                <div styleName="donut-chart-container">
                  <div styleName="donut-chart-box">
                    <DonutChart data={{
                      annualSalary: result.averageSalary,
                      bonus: result.bonusEquityBenefits,
                      recruiment: result.recruiment,
                      overhead: result.overhead,
                    }}
                    />
                  </div>
                  <div styleName="donut-legend-box">
                    <h4 styleName="heading-4">
                      Total Annual Cost:
                      {utils.formatMoneyValueI(result.totalAnnualCost)}
                    </h4>
                    <div>
                      <span styleName="label">
                        <i styleName="dot dot-1" />
                        {' '}
                        Annual Salary
                      </span>
                      <span styleName="label">
                        <i styleName="dot dot-2" />
                        {' '}
                        Bonus, Equity &amp; Benefits
                      </span>
                      <span styleName="label">
                        <i styleName="dot dot-3" />
                        {' '}
                        Recruiment Costs
                      </span>
                      <span styleName="label">
                        <i styleName="dot dot-4" />
                        {' '}
                        Employee Overheads
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* FREELANCER VS. TRADITIONAL HIRING */}
            <Card>
              <Card.Header>
                <h6 styleName="heading-6" className="text-green">FREELANCER VS. TRADITIONAL HIRING</h6>
              </Card.Header>
              <Card.Body>
                <p styleName="text margin-top">
                  By the time your traditionally hired FTE goes through recruitment, interviews,
                  negotiations and agreeing on start dates; the talent at Topcoder has already been
                  working for months at 100% productivity. We can go from the initial request to top-tier
                  verified talent working for you, fast.
                </p>
                <div styleName="line-chart-container">
                  <div styleName="line-chart-box">
                    <LineChart height={isMobileOrTablet ? 230 : undefined} />
                  </div>
                  <div styleName="line-legend-box">
                    <span styleName="label">
                      <i styleName="dot dot-1" />
                      {' '}
                      Topcoder TaaS Process
                    </span>
                    <span styleName="label">
                      <i styleName="dot dot-2" />
                      {' '}
                      Traditional Hiring Process
                    </span>
                  </div>
                  <div styleName="message">
                    <h6 styleName="heading-6" className="text-green">AVG. PRODUCTIVITY GAIN:</h6>
                    <p>280 Hours In The First 3 Months</p>
                  </div>
                  <p styleName="footer">
                    Calculation Based on Average Time to Hire of 30 Days (Traditional FTE Labor) and 40-hours per week usage of Topcoder
                    TaaS Freelancer(s)
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* THE TALENT */}
            <Card>
              <Card.Header>
                <h6 styleName="heading-6" className="text-red">THE TALENT</h6>
              </Card.Header>
              <Card.Body>
                <p styleName="text margin-top">
                  The talent on our platform are virtual collaboration professionals. They are
                  used to sliding seamlessly into new teams and exciting projects and are ready to
                  get to work right away. Here is a snapshot of the talent on our platform.
                </p>
                <div styleName="talents">
                  <SlideShow>
                    {
                      talents.map((talent, index) => {
                        // check if talent if equal to form selected talent
                        const showTalent = talent.tags.some(tag => {
                         return tag.label === form.talentType;
                        })

                        if(!showTalent || members >=5) return null;
                        members++;
                        return (
                            <div
                                styleName={`talent ${index === 0 ? ' first' : ''}`}
                                key={talent.member.handle}
                            >
                              <CardMember
                                  member={talent.member}
                                  tags={talent.tags}
                                  wins={talent.wins}
                                  skills={talent.skills}
                                  experience={talent.experience}
                                  formType={form.talentType}
                              />
                            </div>
                        );
                      })
                    }
                  </SlideShow>
                </div>
              </Card.Body>
            </Card>

            {/* RECALCULATE */}

          </div>
        </div>
      </div>
      {
        <Prints form={form} result={result} talents={talents} getTalents={getTalents} industryIcon={industryIcon} industry={industry} />
      }
    </div>
  );
};

CalculationResult.propTypes = {
  form: PT.shape({
    talentType: PT.string,
    industry: PT.string,
    firstName: PT.string,
    company: PT.string,
  }).isRequired,
  result: PT.shape({
    numberOfEmployee: PT.string,
    costOfLiving: PT.string,
    technologyService: PT.string,
    averageSalary: PT.number,
    bonusEquityBenefits: PT.number,
    recruiment: PT.number,
    overhead: PT.number,
    totalAnnualCost: PT.number,
    totalWeeklyCost: PT.number,
    topcoderWeeklyCost: PT.number,
    youSave: PT.number,
    industryIcon: PT.string,
  }).isRequired,
  talents: PT.arrayOf(PT.shape({
    member: PT.shape({
      photoURL: PT.string,
      handle: PT.string,
      homeCountryCode: PT.string,
      createdAt: PT.oneOfType([PT.string, PT.number]),
    }),
    tag: PT.string,
    wins: PT.number,
    skills: PT.arrayOf(PT.string),
    experience: PT.arrayOf(PT.string),
  })).isRequired,
  getTalents: PT.func.isRequired,
};

const mapStateToProps = (state) => ({
  form: state.calculation.form,
  result: state.calculation.result,
  talents: state.talent.talents,
});

const mapDispatchToProps = {
  getTalents: actions.talent.getTalents,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalculationResult);
